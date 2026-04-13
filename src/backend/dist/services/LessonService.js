"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const AIEngine_1 = require("./AIEngine");
const lesson_model_1 = require("../model/lesson.model");
const prompts_1 = require("../utils/prompts");
class LessonService {
    constructor() {
        this.aiEngine = AIEngine_1.AIEngine.getInstance();
    }
    async generateContent(data) {
        const { subject, topic, grade, duration } = data;
        const prompt = (0, prompts_1.lessonPlanPrompt)({ subject, topic, grade, duration });
        const lessonData = await this.aiEngine.execute(prompt);
        return lessonData;
    }
    async storePlan(data) {
        const { subject, topic, grade, duration, creatorId } = data;
        await lesson_model_1.LessonPlanModel.create({ subject, topic, grade, duration, creatorId });
    }
    async getPlans(creatorId) {
        return lesson_model_1.LessonPlanModel.find({ creatorId }).sort({ createdAt: -1 });
    }
    async deletePlan(planId, creatorId) {
        await lesson_model_1.LessonPlanModel.findOneAndDelete({ _id: planId, creatorId });
    }
}
exports.LessonService = LessonService;
