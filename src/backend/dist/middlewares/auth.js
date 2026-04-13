"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.AuthMiddleware = void 0;
const JWTService_1 = require("../services/JWTService");
class AuthMiddleware {
    constructor() {
        this.verifyToken = (req, res, next) => {
            let accessToken = req.cookies.accessToken;
            if (!accessToken && req.headers.authorization) {
                const authHeader = req.headers.authorization;
                if (authHeader.startsWith("Bearer ")) {
                    accessToken = authHeader.substring(7, authHeader.length);
                }
            }
            if (!accessToken) {
                res.status(403).json({ msg: "no access token provided" });
                return;
            }
            try {
                const decodedToken = this.jwtService.verifyAccessToken(accessToken);
                req.userId = decodedToken.userId;
                next();
            }
            catch (error) {
                const status = error.message?.includes("expired") ? 401 : 403;
                res.status(status).json({ msg: `Unable to verify the token error : ${error.message}` });
            }
        };
        this.jwtService = new JWTService_1.JWTService();
    }
}
exports.AuthMiddleware = AuthMiddleware;
exports.auth = new AuthMiddleware().verifyToken;
