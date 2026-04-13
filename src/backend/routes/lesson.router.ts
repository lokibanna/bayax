import { Router } from "express";
import { LessonController } from "../controller/lesson.controller";
import { auth } from "../middlewares/auth";

const lessonRouter = Router();
const lessonController = new LessonController();

lessonRouter.post("/createPlan", auth, lessonController.createPlan);
lessonRouter.get("/viewAllLessonPlans", auth, lessonController.viewAllPlans);

export { lessonRouter };
