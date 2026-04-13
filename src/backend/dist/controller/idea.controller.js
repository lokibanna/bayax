"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaController = void 0;
const IdeaService_1 = require("../services/IdeaService");
class IdeaController {
    constructor() {
        this.analyzeIdea = async (req, res) => {
            try {
                const { field, intent, content, techStack } = req.body;
                const creatorId = req.userId;
                const analysisData = await this.ideaService.performAnalysis({ field, intent, content, techStack, creatorId });
                await this.ideaService.storeProject({ field, intent, content, techStack, creatorId }, analysisData);
                res.status(200).json({ success: true, data: analysisData });
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message || "AI Analysis Failed" });
            }
        };
        this.getProjects = async (req, res) => {
            try {
                const creatorId = req.userId;
                const projects = await this.ideaService.getProjects(creatorId);
                res.status(200).json({ success: true, projects });
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        };
        this.deleteProject = async (req, res) => {
            try {
                const creatorId = req.userId;
                const id = req.params.id;
                await this.ideaService.deleteProject(id, creatorId);
                res.status(200).json({ success: true, message: "Project deleted" });
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        };
        this.ideaService = new IdeaService_1.IdeaService();
    }
}
exports.IdeaController = IdeaController;
