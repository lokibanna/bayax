import { Request, Response } from "express";
import fs from "fs";
import { LessonService } from "../services/LessonService";
import { lessonPlanObject } from "../utils/zod";
import { createDocument } from "../utils/convert";

export class LessonController {
  private readonly lessonService: LessonService;

  constructor() {
    this.lessonService = new LessonService();
  }

  private toText(data: string[] | string): string {
    return Array.isArray(data) ? data.join("\n") : data;
  }

  public createPlan = async (req: Request, res: Response): Promise<void> => {
    const parsedObject = lessonPlanObject.safeParse(req.body);
    const creatorId = (req as any).userId;

    if (!parsedObject.success) {
      res.status(403).json({ msg: "provide valid credentials", error: parsedObject.error.errors });
      return;
    }

    const { subject, topic, grade, duration } = parsedObject.data;

    try {
      const lessonData = (await this.lessonService.generateContent({
        subject,
        topic,
        grade,
        duration,
        creatorId,
      })) as any;

      const docFile = await createDocument({
        subject,
        topic,
        grade: String(grade),
        duration,
        overviewText: lessonData.overview,
        curricularText: `${this.toText(lessonData.curricularGoals)}\n${this.toText(lessonData.curricularCompetencies)}`,
        factualsText: this.toText(lessonData.factualKnowledge),
        conceptualText: this.toText(lessonData.conceptualKnowledge),
        proceduralText: this.toText(lessonData.proceduralKnowledge),
        essentialQuestionText: this.toText(lessonData.essentialQuestions),
        teachingPointText: this.toText(lessonData.teachingPoints),
        sequentialActivityText: this.toText(lessonData.sequentialActivities),
        formativeAssesmentText: this.toText(lessonData.formativeAssessments),
        gptQuestionText: this.toText(lessonData.gptQuestions),
        summarizationhomeText: `${lessonData.summarization}\n\nHomework:\n${this.toText(lessonData.homework)}`,
      });

      await this.lessonService.storePlan({ subject, topic, grade, duration, creatorId });

      const docxBase64 = fs.readFileSync(docFile).toString("base64");
      fs.unlink(docFile, () => {});

      res.status(200).json({ success: true, lessonPlan: lessonData, docxFile: docxBase64, filename: `${topic}.docx` });
    } catch (error: any) {
      if (!res.headersSent) {
        res.status(500).json({ msg: `error while creating the lesson plan: ${error.message}` });
      }
    }
  };

  public viewAllPlans = async (req: Request, res: Response): Promise<void> => {
    const creatorId = (req as any).userId;
    try {
      const lessonPlans = await this.lessonService.getPlans(creatorId);
      res.status(200).json({ msg: "lesson plans fetched successfully", lessonPlans });
    } catch (error: any) {
      res.status(500).json({ msg: `error while fetching plans: ${error.message}` });
    }
  };
}
