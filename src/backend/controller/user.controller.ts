import { Request, Response } from "express";
import { signUpObject, signInObject } from "../utils/zod";
import { UserService } from "../services/UserService";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
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

    try {
      const result = await this.userService.register(parsedObject.data);
      const options = this.getCookieOptions();

      res
        .status(200)
        .cookie("accessToken", result.tokens.accessToken, options)
        .cookie("refreshToken", result.tokens.refreshToken, options)
        .json({ msg: "user created successfully", username: result.username });
    } catch (error: any) {
      if (error.message === "EMAIL_EXISTS") {
        res.status(409).json({ msg: "same email Id exists" });
      } else {
        res.status(500).json({ msg: `something went wrong while creating user: ${error}` });
      }
    }
  };

  public signIn = async (req: Request, res: Response): Promise<void> => {
    const parsedObject = signInObject.safeParse(req.body);
    if (!parsedObject.success) {
      res.status(403).json({ msg: "invalid credentials", error: parsedObject.error.errors });
      return;
    }

    try {
      const result = await this.userService.login(parsedObject.data.email, parsedObject.data.password);
      const options = this.getCookieOptions();

      res
        .status(200)
        .cookie("accessToken", result.tokens.accessToken, options)
        .cookie("refreshToken", result.tokens.refreshToken, options)
        .json({ msg: "user logged in Successfully", username: result.username });
    } catch (error: any) {
      if (error.message === "INVALID_CREDENTIALS") {
        res.status(400).json({ msg: "incorrect password or email" });
      } else {
        res.status(500).json({ msg: `something went wrong while signin: ${error.message}` });
      }
    }
  };

  public refreshToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(401).json({ msg: "No refresh token" });
      return;
    }

    try {
      const accessToken = this.userService.refreshAccessToken(token);
      res.cookie("accessToken", accessToken, this.getCookieOptions());
      res.status(200).json({ msg: "Token refreshed" });
    } catch {
      res.status(403).json({ msg: "Invalid refresh token" });
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
