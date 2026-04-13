"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JWTService {
    constructor() {
        this.accessSecret = process.env.ACCESS_TOKEN_SECRET || "default_secret";
        this.refreshSecret = process.env.REFRESH_TOKEN_SECRET || "default_secret";
        this.accessExpiry = process.env.ACCESS_TOKEN_EXPIRY || "15m";
        this.refreshExpiry = process.env.REFRESH_TOKEN_EXPIRY || "7d";
    }
    generateAccessToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, this.accessSecret, {
            expiresIn: this.accessExpiry,
        });
    }
    generateRefreshToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, this.refreshSecret, {
            expiresIn: this.refreshExpiry,
        });
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, this.refreshSecret);
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this.accessSecret);
    }
}
exports.JWTService = JWTService;
