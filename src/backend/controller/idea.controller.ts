import { Request, Response } from "express";
import { IdeaService } from "../services/IdeaService";

export class IdeaController {
  private readonly ideaService: IdeaService;

  constructor() {
    this.ideaService = new IdeaService();
  }

  public analyzeIdea = async (req: Request, res: Response): Promise<void> => {
    try {
      const { field, intent, content, techStack } = req.body;
      const creatorId = (req as any).userId;

      const analysisData = await this.ideaService.performAnalysis({ field, intent, content, techStack, creatorId });
      await this.ideaService.storeProject({ field, intent, content, techStack, creatorId }, analysisData);

      res.status(200).json({ success: true, data: analysisData });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "AI Analysis Failed" });
    }
  };

  public getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      const creatorId = (req as any).userId;
      const projects = await this.ideaService.getProjects(creatorId);
      res.status(200).json({ success: true, projects });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const creatorId = (req as any).userId;
      const { id } = req.params;
      await this.ideaService.deleteProject(id, creatorId);
      res.status(200).json({ success: true, message: "Project deleted" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
