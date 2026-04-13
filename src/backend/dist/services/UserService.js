"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../model/user.model");
const JWTService_1 = require("./JWTService");
class UserService {
    constructor() {
        this.jwtService = new JWTService_1.JWTService();
    }
    async register(payload) {
        const existing = await user_model_1.UserModel.findOne({ email: payload.email });
        if (existing)
            throw new Error("EMAIL_EXISTS");
        const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
        const user = await user_model_1.UserModel.create({
            email: payload.email,
            username: payload.username,
            password: hashedPassword,
        });
        const tokens = this.generateTokens(user._id);
        return { tokens, username: user.username };
    }
    async login(email, password) {
        const user = await user_model_1.UserModel.findOne({ email });
        if (!user)
            throw new Error("INVALID_CREDENTIALS");
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid)
            throw new Error("INVALID_CREDENTIALS");
        const tokens = this.generateTokens(user._id);
        return { tokens, username: user.username };
    }
    refreshAccessToken(refreshToken) {
        const decoded = this.jwtService.verifyRefreshToken(refreshToken);
        return this.jwtService.generateAccessToken(decoded.userId);
    }
    async getProfile(userId) {
        return user_model_1.UserModel.findById(userId).select("-password");
    }
    generateTokens(userId) {
        return {
            accessToken: this.jwtService.generateAccessToken(userId),
            refreshToken: this.jwtService.generateRefreshToken(userId),
        };
    }
}
exports.UserService = UserService;
