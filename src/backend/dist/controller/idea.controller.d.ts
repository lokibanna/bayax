import { Request, Response } from "express";
export declare class IdeaController {
    private readonly ideaService;
    constructor();
    analyzeIdea: (req: Request, res: Response) => Promise<void>;
    getProjects: (req: Request, res: Response) => Promise<void>;
    deleteProject: (req: Request, res: Response) => Promise<void>;
}
