import { Request, Response } from "express";
import { AIEngine } from "../services/AIEngine";

interface IdeaRequestBody {
  field: string;
  intent: string;
  content?: string;
  techStack?: string;
}

export class IdeaController {
  private readonly aiEngine: AIEngine;

  constructor() {
    this.aiEngine = AIEngine.getInstance();
  }

  public analyzeIdea = async (req: Request, res: Response): Promise<void> => {
    try {
      const { field, intent, content, techStack }: IdeaRequestBody = req.body;

      let promptContext = "";
      if (intent === "need_idea") {
        promptContext = `
          USER SCENARIO: The user wants to build something in the "${field}" field but DOES NOT have a specific idea.
          USER CONSTRAINTS: "${content || "None provided"}"
          PREFERRED TECH: "${techStack || "Any"}"
          TASK: Generate a highly viable, modern startup idea in the ${field} space, then analyze it.
        `;
      } else {
        promptContext = `
          USER SCENARIO: The user has a specific idea in the "${field}" field.
          IDEA DESCRIPTION: "${content}"
          PREFERRED TECH: "${techStack || "Best suited for the project"}"
          TASK: Analyze this idea. Enhance it, structure it, and validate it.
        `;
      }

      const systemPrompt = this.aiEngine.buildPrompt(promptContext, "idea");
      const jsonResponse = await this.aiEngine.execute(systemPrompt);

      res.status(200).json({ success: true, data: jsonResponse });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "AI Analysis Failed",
        error: error.message,
      });
    }
  };
}
