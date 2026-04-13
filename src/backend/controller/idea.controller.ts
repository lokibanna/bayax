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

      const analysisData = await this.ideaService.performAnalysis({
        field,
        intent,
        content,
        techStack,
        creatorId,
      });

      await this.ideaService.storeProject(
        { field, intent, content, techStack, creatorId },
        analysisData
      );

      res.status(200).json({ success: true, data: analysisData });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "AI Analysis Failed",
        error: error.message,
      });
    }
  };
}
