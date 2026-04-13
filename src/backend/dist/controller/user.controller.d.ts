import { Request, Response } from "express";
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    constructor();
    private getCookieOptions;
    signUp: (req: Request, res: Response) => Promise<void>;
    signIn: (req: Request, res: Response) => Promise<void>;
    refreshToken: (req: Request, res: Response) => Promise<void>;
    viewPlans: (req: Request, res: Response) => Promise<void>;
    clearCookie: (req: Request, res: Response) => void;
}
