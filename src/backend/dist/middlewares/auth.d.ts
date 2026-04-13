import { Request, Response, NextFunction } from "express";
export declare class AuthMiddleware {
    private readonly jwtService;
    constructor();
    verifyToken: (req: Request, res: Response, next: NextFunction) => void;
}
export declare const auth: (req: Request, res: Response, next: NextFunction) => void;
