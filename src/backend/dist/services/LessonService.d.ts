interface LessonInput {
    subject: string;
    topic: string;
    grade: number;
    duration: number;
    creatorId: string;
}
export declare class LessonService {
    private readonly aiEngine;
    constructor();
    generateContent(data: LessonInput): Promise<object>;
    storePlan(data: LessonInput): Promise<void>;
    getPlans(creatorId: string): Promise<(import("mongoose").Document<unknown, {}, import("../model/lesson.model").ILessonPlan> & import("../model/lesson.model").ILessonPlan & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    })[]>;
    deletePlan(planId: string, creatorId: string): Promise<void>;
}
export {};
