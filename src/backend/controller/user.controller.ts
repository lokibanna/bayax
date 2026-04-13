import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { signUpObject, signInObject } from "../utils/zod";
import { UserModel } from "../model/user.model";
import { LessonPlanModel } from "../model/lesson.model";
import { JWTService } from "../services/JWTService";

export class UserController {
  private readonly jwtService: JWTService;

  constructor() {
    this.jwtService = new JWTService();
  }

  private getCookieOptions() {
    const isProd = process.env.NODE_ENV === "production";
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? ("none" as const) : ("lax" as const),
      path: "/",
    };
  }

  public signUp = async (req: Request, res: Response): Promise<void> => {
    const parsedObject = signUpObject.safeParse(req.body);
    if (!parsedObject.success) {
      res.status(403).json({ msg: "invalid credentials", error: parsedObject.error.errors });
      return;
    }

    const { email, username, password } = parsedObject.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(409).json({ msg: "same email Id exists" });
        return;
      }

      const user = await UserModel.create({ email, username, password: hashedPassword });
      const accessToken = this.jwtService.generateAccessToken(user._id as string);
      const refreshToken = this.jwtService.generateRefreshToken(user._id as string);
      const options = this.getCookieOptions();

      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ msg: "user created successfully", username: user.username });
    } catch (error: any) {
      res.status(500).json({ msg: `something went wrong while creating user: ${error}` });
    }
  };

  public signIn = async (req: Request, res: Response): Promise<void> => {
    const parsedObject = signInObject.safeParse(req.body);
    if (!parsedObject.success) {
      res.status(403).json({ msg: "invalid credentials", error: parsedObject.error.errors });
      return;
    }

    const { email, password } = parsedObject.data;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: "incorrect password or email" });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ msg: "incorrect password or email" });
        return;
      }

      const accessToken = this.jwtService.generateAccessToken(user._id as string);
      const refreshToken = this.jwtService.generateRefreshToken(user._id as string);
      const options = this.getCookieOptions();

      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ msg: "user logged in Successfully", username: user.username });
    } catch (error: any) {
      res.status(500).json({ msg: `something went wrong while signin: ${error.message}` });
    }
  };

  public refreshToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(401).json({ msg: "No refresh token" });
      return;
    }

    try {
      const decoded = this.jwtService.verifyRefreshToken(token);
      const accessToken = this.jwtService.generateAccessToken(decoded.userId);
      res.cookie("accessToken", accessToken, this.getCookieOptions());
      res.status(200).json({ msg: "Token refreshed" });
    } catch {
      res.status(403).json({ msg: "Invalid refresh token" });
    }
  };

  public viewPlans = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;
    try {
      const lessonPlans = await LessonPlanModel.find({ creatorId: userId });
      res.status(200).json({ msg: "lesson plan fetched successfully", lessonPlans });
    } catch (error: any) {
      res.status(500).json({ msg: `error while fetching the data: ${error.message}` });
    }
  };

  public clearCookie = (req: Request, res: Response): void => {
    const isProd = process.env.NODE_ENV === "production";
    const options = { path: "/", httpOnly: true, secure: isProd };
    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);
    res.status(200).json({ msg: "User logged Out" });
  };
}
