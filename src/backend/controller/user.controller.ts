import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signUpObject, signInObject } from "../utils/zod";
import { UserModel } from "../model/user.model";
import { LessonPlanModel } from "../model/lesson.model";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === "production";
  return { httpOnly: true, secure: isProd, sameSite: isProd ? "none" as const : "lax" as const, path: "/" };
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const parsedObject = signUpObject.safeParse(req.body);
  if (!parsedObject.success) {
    res.status(403).json({ msg: "invalid credentials", error: parsedObject.error.errors });
    return;
  }

  const { email, username, password } = parsedObject.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const findUser = await UserModel.findOne({ email });
    if (findUser) { res.status(409).json({ msg: "same email Id exists" }); return; }

    const user = await UserModel.create({ email, username, password: hashedPassword });
    const accessToken = generateAccessToken(user._id as string);
    const refreshToken = generateRefreshToken(user._id as string);

    res.status(200).cookie("accessToken", accessToken, getCookieOptions()).cookie("refreshToken", refreshToken, getCookieOptions()).json({ msg: "user created successfully", username: user.username });
  } catch (error: any) {
    res.status(500).json({ msg: `something went wrong while creating user error : ${error}` });
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const parsedObject = signInObject.safeParse(req.body);
  if (!parsedObject.success) {
    res.status(403).json({ msg: "invalid credentials", error: parsedObject.error.errors });
    return;
  }

  const { email, password } = parsedObject.data;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) { res.status(400).json({ msg: "incorrect password or email" }); return; }

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) { res.status(400).json({ msg: "incorrect password or email" }); return; }

    const accessToken = generateAccessToken(user._id as string);
    const refreshToken = generateRefreshToken(user._id as string);

    res.status(200).cookie("accessToken", accessToken, getCookieOptions()).cookie("refreshToken", refreshToken, getCookieOptions()).json({ msg: "user logged in Successfully", username: user.username });
  } catch (error: any) {
    res.status(500).json({ msg: `something went wrong while signin ; error : ${error.message}` });
  }
};

export const viewPlans = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;
  try {
    const response = await LessonPlanModel.find({ creatorId: userId });
    res.status(200).json({ msg: "lesson plan fetched successfully", lessonPlans: response });
  } catch (error: any) {
    res.status(500).json({ msg: `error while fetching the data, ${error.message}` });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.refreshToken;
  if (!token) { res.status(401).json({ msg: "No refresh token" }); return; }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string };
    const accessToken = generateAccessToken(decoded.userId);
    res.cookie("accessToken", accessToken, getCookieOptions());
    res.status(200).json({ msg: "Token refreshed" });
  } catch (error) {
    res.status(403).json({ msg: "Invalid refresh token" });
  }
};

export const clearCookie = (req: Request, res: Response): void => {
  const isProd = process.env.NODE_ENV === "production";
  const options = { path: "/", httpOnly: true, secure: isProd };
  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
  res.status(200).json({ msg: "User logged Out" });
};
