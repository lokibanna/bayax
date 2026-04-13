"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaService = void 0;
const AIEngine_1 = require("./AIEngine");
const idea_model_1 = require("../model/idea.model");
class IdeaService {
    constructor() {
        this.aiEngine = AIEngine_1.AIEngine.getInstance();
    }
    async performAnalysis(data) {
        const { field, intent, content, techStack } = data;
        let promptContext = "";
        if (intent === "need_idea") {
            promptContext = `
        USER SCENARIO: The user wants to build something in the "${field}" field but DOES NOT have a specific idea.
        USER CONSTRAINTS: "${content || "None provided"}"
        PREFERRED TECH: "${techStack || "Any"}"
        TASK: Generate a highly viable, modern startup idea in the ${field} space, then analyze it.
      `;
        }
        else {
            promptContext = `
        USER SCENARIO: The user has a specific idea in the "${field}" field.
        IDEA DESCRIPTION: "${content}"
        PREFERRED TECH: "${techStack || "Best suited for the project"}"
        TASK: Analyze this idea. Enhance it, structure it, and validate it.
      `;
        }
        const systemPrompt = this.aiEngine.buildPrompt(promptContext, "idea");
        const analysisData = await this.aiEngine.execute(systemPrompt);
        return analysisData;
    }
    async storeProject(data, analysisData) {
        const projectName = analysisData?.clarityCheck?.refinedConcept || "Untitled Project";
        await idea_model_1.IdeaProjectModel.create({
            field: data.field,
            intent: data.intent,
            projectName,
            status: "completed",
            analysisData,
            creatorId: data.creatorId,
        });
    }
    async getProjects(creatorId) {
        return idea_model_1.IdeaProjectModel.find({ creatorId }).sort({ createdAt: -1 });
    }
    async deleteProject(projectId, creatorId) {
        await idea_model_1.IdeaProjectModel.findOneAndDelete({ _id: projectId, creatorId });
    }
}
exports.IdeaService = IdeaService;
