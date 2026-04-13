import { Router } from "express";
import { IdeaController } from "../controller/idea.controller";
import { auth } from "../middlewares/auth";

const ideaRouter = Router();
const ideaController = new IdeaController();

ideaRouter.post("/analyze", auth, ideaController.analyzeIdea);

export { ideaRouter };
