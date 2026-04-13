import { Request, Response } from "express";
export declare class LessonController {
    private readonly aiEngine;
    constructor();
    private toText;
    private getMockData;
    createPlan: (req: Request, res: Response) => Promise<void>;
    viewAllPlans: (req: Request, res: Response) => Promise<void>;
}
