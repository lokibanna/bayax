"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const zod_1 = require("../utils/zod");
const UserService_1 = require("../services/UserService");
const lesson_model_1 = require("../model/lesson.model");
const JWTService_1 = require("../services/JWTService");
class UserController {
    constructor() {
        this.signUp = async (req, res) => {
            const parsedObject = zod_1.signUpObject.safeParse(req.body);
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
            }
            catch (error) {
                if (error.message === "EMAIL_EXISTS") {
                    res.status(409).json({ msg: "same email Id exists" });
                }
                else {
                    res.status(500).json({ msg: `something went wrong while creating user: ${error}` });
                }
            }
        };
        this.signIn = async (req, res) => {
            const parsedObject = zod_1.signInObject.safeParse(req.body);
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
            }
            catch (error) {
                if (error.message === "INVALID_CREDENTIALS") {
                    res.status(400).json({ msg: "incorrect password or email" });
                }
                else {
                    res.status(500).json({ msg: `something went wrong while signin: ${error.message}` });
                }
            }
        };
        this.refreshToken = async (req, res) => {
            const token = req.cookies.refreshToken;
            if (!token) {
                res.status(401).json({ msg: "No refresh token" });
                return;
            }
            try {
                const accessToken = this.userService.refreshAccessToken(token);
                res.cookie("accessToken", accessToken, this.getCookieOptions());
                res.status(200).json({ msg: "Token refreshed" });
            }
            catch {
                res.status(403).json({ msg: "Invalid refresh token" });
            }
        };
        this.viewPlans = async (req, res) => {
            const userId = req.userId;
            try {
                const lessonPlans = await lesson_model_1.LessonPlanModel.find({ creatorId: userId });
                res.status(200).json({ msg: "lesson plan fetched successfully", lessonPlans });
            }
            catch (error) {
                res.status(500).json({ msg: `error while fetching the data: ${error.message}` });
            }
        };
        this.clearCookie = (req, res) => {
            const isProd = process.env.NODE_ENV === "production";
            const options = { path: "/", httpOnly: true, secure: isProd };
            res.clearCookie("accessToken", options);
            res.clearCookie("refreshToken", options);
            res.status(200).json({ msg: "User logged Out" });
        };
        this.userService = new UserService_1.UserService();
        this.jwtService = new JWTService_1.JWTService();
    }
    getCookieOptions() {
        const isProd = process.env.NODE_ENV === "production";
        return {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
        };
    }
}
exports.UserController = UserController;
