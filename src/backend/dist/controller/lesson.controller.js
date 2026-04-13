"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const fs_1 = __importDefault(require("fs"));
const AIEngine_1 = require("../services/AIEngine");
const zod_1 = require("../utils/zod");
const lesson_model_1 = require("../model/lesson.model");
const convert_1 = require("../utils/convert");
const prompts_1 = require("../utils/prompts");
class LessonController {
    constructor() {
        this.createPlan = async (req, res) => {
            const parsedObject = zod_1.lessonPlanObject.safeParse(req.body);
            const userId = req.userId;
            if (!parsedObject.success) {
                res.status(403).json({ msg: "provide valid credentials", error: parsedObject.error.errors });
                return;
            }
            const { subject, topic, grade, duration } = parsedObject.data;
            const prompt = (0, prompts_1.lessonPlanPrompt)({ subject, topic, grade, duration });
            let lessonData;
            try {
                lessonData = (await this.aiEngine.execute(prompt));
            }
            catch (err) {
                console.error("[LessonController] All AI providers failed. Using mock data.", err);
                lessonData = this.getMockData(topic);
            }
            try {
                const docFile = await (0, convert_1.createDocument)({
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
                await lesson_model_1.LessonPlanModel.create({ subject, topic, grade, duration, creatorId: userId });
                const docxBase64 = fs_1.default.readFileSync(docFile).toString("base64");
                fs_1.default.unlink(docFile, () => { });
                res.status(200).json({ success: true, lessonPlan: lessonData, docxFile: docxBase64, filename: `${topic}.docx` });
            }
            catch (error) {
                if (!res.headersSent) {
                    res.status(500).json({ msg: `error while creating the lesson plan: ${error.message}` });
                }
            }
        };
        this.viewAllPlans = async (req, res) => {
            const userId = req.userId;
            try {
                const lessonPlans = await lesson_model_1.LessonPlanModel.find({ creatorId: userId });
                res.status(200).json({ msg: "lesson plans fetched successfully", lessonPlans });
            }
            catch (error) {
                res.status(500).json({ msg: `error while fetching plans: ${error.message}` });
            }
        };
        this.aiEngine = AIEngine_1.AIEngine.getInstance();
    }
    toText(data) {
        return Array.isArray(data) ? data.join("\n") : data;
    }
    getMockData(topic) {
        return {
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
        };
    }
}
exports.LessonController = LessonController;
