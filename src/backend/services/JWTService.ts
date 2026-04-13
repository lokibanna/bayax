import jwt, { SignOptions } from "jsonwebtoken";

export class JWTService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiry: string;
  private readonly refreshExpiry: string;

  constructor() {
    this.accessSecret = process.env.ACCESS_TOKEN_SECRET || "default_secret";
    this.refreshSecret = process.env.REFRESH_TOKEN_SECRET || "default_secret";
    this.accessExpiry = process.env.ACCESS_TOKEN_EXPIRY || "15m";
    this.refreshExpiry = process.env.REFRESH_TOKEN_EXPIRY || "7d";
  }

  public generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, this.accessSecret, {
      expiresIn: this.accessExpiry,
    } as SignOptions);
  }

  public generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, this.refreshSecret, {
      expiresIn: this.refreshExpiry,
    } as SignOptions);
  }

  public verifyRefreshToken(token: string): { userId: string } {
    return jwt.verify(token, this.refreshSecret) as { userId: string };
  }

  public verifyAccessToken(token: string): { userId: string } {
    return jwt.verify(token, this.accessSecret) as { userId: string };
  }
}
