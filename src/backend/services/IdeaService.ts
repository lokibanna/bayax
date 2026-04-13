import { AIEngine } from "./AIEngine";
import { IdeaProjectModel } from "../model/idea.model";

interface IdeaInput {
  field: string;
  intent: string;
  content?: string;
  techStack?: string;
  creatorId: string;
}

export class IdeaService {
  private readonly aiEngine: AIEngine;

  constructor() {
    this.aiEngine = AIEngine.getInstance();
  }

  async performAnalysis(data: IdeaInput): Promise<object> {
    const { field, intent, content, techStack } = data;

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

    const systemPrompt = this.aiEngine.buildPrompt(promptContext);
    const analysisData = await this.aiEngine.execute(systemPrompt);
    return analysisData;
  }

  async storeProject(data: IdeaInput, analysisData: object): Promise<void> {
    const projectName = (analysisData as any)?.clarityCheck?.refinedConcept || "Untitled Project";
    await IdeaProjectModel.create({
      field: data.field,
      intent: data.intent,
      projectName,
      status: "completed",
      analysisData,
      creatorId: data.creatorId,
    });
  }
}
