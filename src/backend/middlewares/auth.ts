import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
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
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as DecodedToken;
    (req as any).userId = decodedToken.userId;
    next();
  } catch (error: any) {
    const status = error.message.includes("expired") ? 401 : 403;
    res.status(status).json({ msg: `Unable to verify the token error : ${error.message}` });
  }
};
