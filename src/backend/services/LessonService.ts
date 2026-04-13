import { AIEngine } from "./AIEngine";
import { LessonPlanModel } from "../model/lesson.model";
import { lessonPlanPrompt } from "../utils/prompts";

interface LessonInput {
  subject: string;
  topic: string;
  grade: number;
  duration: number;
  creatorId: string;
}

export class LessonService {
  private readonly aiEngine: AIEngine;

  constructor() {
    this.aiEngine = AIEngine.getInstance();
  }

  async generateContent(data: LessonInput): Promise<object> {
    const { subject, topic, grade, duration } = data;
    const prompt = lessonPlanPrompt({ subject, topic, grade, duration });
    const lessonData = await this.aiEngine.execute(prompt);
    return lessonData;
  }

  async storePlan(data: LessonInput): Promise<void> {
    const { subject, topic, grade, duration, creatorId } = data;
    await LessonPlanModel.create({ subject, topic, grade, duration, creatorId });
  }

  async getPlans(creatorId: string) {
    return LessonPlanModel.find({ creatorId }).sort({ createdAt: -1 });
  }
}
