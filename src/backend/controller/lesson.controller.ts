import { Request, Response } from "express";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { lessonPlanObject } from "../utils/zod";
import { LessonPlanModel } from "../model/lesson.model";
import { createDocument } from "../utils/convert";
import { lessonPlanPrompt } from "../utils/prompts";

interface LessonData {
  overview: string;
  curricularGoals: string[];
  curricularCompetencies: string[];
  factualKnowledge: string[] | string;
  conceptualKnowledge: string[] | string;
  proceduralKnowledge: string[] | string;
  essentialQuestions: string[] | string;
  teachingPoints: string[] | string;
  sequentialActivities: string[] | string;
  formativeAssessments: string[] | string;
  gptQuestions: string[] | string;
  summarization: string;
  homework: string[] | string;
}

const toText = (data: string[] | string): string => {
  return Array.isArray(data) ? data.join("\n") : data;
};

const getMockData = (topic: string): LessonData => ({
  overview: `This is a sample lesson plan for ${topic}. The AI generation failed, so we are providing this template.`,
  curricularGoals: ["Understand the core concepts of the topic.", "Apply knowledge to real-world scenarios."],
  curricularCompetencies: ["Critical thinking analysis.", "Collaborative problem solving.", "Information synthesis."],
  factualKnowledge: ["Key Fact 1: The foundation of the topic.", "Key Fact 2: Historical context.", "Key Fact 3: Modern application."],
  conceptualKnowledge: ["Concept 1: Theoretical framework.", "Concept 2: Underlying principles.", "Concept 3: Abstract connections."],
  proceduralKnowledge: ["Step 1: Initial preparation.", "Step 2: Execution phase.", "Step 3: Review and analysis."],
  essentialQuestions: ["Why is this topic important?", "How does it impact our daily lives?", "What are the future implications?"],
  teachingPoints: ["Introduce the main vocabulary.", "Demonstrate with a practical example.", "Facilitate group discussion."],
  sequentialActivities: ["Activity 1: Brainstorming session (10 min).", "Activity 2: Group project work (20 min).", "Activity 3: Class presentation (15 min)."],
  formativeAssessments: ["Quick quiz on key terms.", "Think-pair-share observation.", "Exit ticket validation."],
  gptQuestions: ["What was the most difficult concept?", "How would you explain this to a friend?", "Can you think of another example?"],
  summarization: "This lesson covered the fundamental aspects of the topic, ensuring students grasped both theory and practice.",
  homework: ["Read the assigned chapter.", "Complete the worksheet questions.", "Prepare a short summary for next class."],
});

export const createPlan = async (req: Request, res: Response): Promise<void> => {
  const parsedObject = lessonPlanObject.safeParse(req.body);
  const userId = (req as any).userId;

  if (!parsedObject.success) {
    res.status(403).json({ msg: "provide valid credentials", error: parsedObject.error.errors });
    return;
  }

  const { subject, topic, grade, duration } = parsedObject.data;
  const prompt = lessonPlanPrompt({ subject, topic, grade, duration });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "mock_key");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    let lessonData: LessonData;

    try {
      const result = await model.generateContent(prompt + " Output ONLY valid JSON. Do not use Markdown code blocks.");
      const response = await result.response;
      const rawContent = response.text();

      try {
        lessonData = JSON.parse(rawContent);
      } catch {
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          lessonData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Failed to parse AI response");
        }
      }
    } catch {
      lessonData = getMockData(topic);
    }

    const docFile = await createDocument({
      subject,
      topic,
      grade: String(grade),
      duration,
      overviewText: lessonData.overview,
      curricularText: `${toText(lessonData.curricularGoals)}\n${toText(lessonData.curricularCompetencies)}`,
      factualsText: toText(lessonData.factualKnowledge),
      conceptualText: toText(lessonData.conceptualKnowledge),
      proceduralText: toText(lessonData.proceduralKnowledge),
      essentialQuestionText: toText(lessonData.essentialQuestions),
      teachingPointText: toText(lessonData.teachingPoints),
      sequentialActivityText: toText(lessonData.sequentialActivities),
      formativeAssesmentText: toText(lessonData.formativeAssessments),
      gptQuestionText: toText(lessonData.gptQuestions),
      summarizationhomeText: `${lessonData.summarization}\n\nHomework:\n${toText(lessonData.homework)}`,
    });

    await LessonPlanModel.create({ subject, topic, grade, duration, creatorId: userId });

    const docxBase64 = fs.readFileSync(docFile).toString("base64");
    fs.unlink(docFile, () => {});

    res.status(200).json({ success: true, lessonPlan: lessonData, docxFile: docxBase64, filename: `${topic}.docx` });
  } catch (error: any) {
    if (!res.headersSent) {
      res.status(500).json({ msg: `error while creating the lesson Plan ${error.message}` });
    }
  }
};

export const viewAllPlans = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;
  try {
    const lessonPlans = await LessonPlanModel.find({ creatorId: userId });
    res.status(200).json({ msg: "lesson plans fetched successfully", lessonPlans });
  } catch (error: any) {
    res.status(500).json({ msg: `error while fetching plans : ${error.message}` });
  }
};
