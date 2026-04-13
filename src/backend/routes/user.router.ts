import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { auth } from "../middlewares/auth";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);
userRouter.post("/refreshToken", userController.refreshToken);
userRouter.get("/api/logOut", auth, userController.clearCookie);

export { userRouter };
