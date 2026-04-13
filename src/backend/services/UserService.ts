import bcrypt from "bcrypt";
import { UserModel } from "../model/user.model";
import { JWTService } from "./JWTService";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserPayload {
  email: string;
  username: string;
  password: string;
}

export class UserService {
  private readonly jwtService: JWTService;

  constructor() {
    this.jwtService = new JWTService();
  }

  async register(payload: UserPayload): Promise<{ tokens: AuthTokens; username: string }> {
    const existing = await UserModel.findOne({ email: payload.email });
    if (existing) throw new Error("EMAIL_EXISTS");

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await UserModel.create({
      email: payload.email,
      username: payload.username,
      password: hashedPassword,
    });

    const tokens = this.generateTokens(user._id as string);
    return { tokens, username: user.username };
  }

  async login(email: string, password: string): Promise<{ tokens: AuthTokens; username: string }> {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("INVALID_CREDENTIALS");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("INVALID_CREDENTIALS");

    const tokens = this.generateTokens(user._id as string);
    return { tokens, username: user.username };
  }

  refreshAccessToken(refreshToken: string): string {
    const decoded = this.jwtService.verifyRefreshToken(refreshToken);
    return this.jwtService.generateAccessToken(decoded.userId);
  }

  private generateTokens(userId: string): AuthTokens {
    return {
      accessToken: this.jwtService.generateAccessToken(userId),
      refreshToken: this.jwtService.generateRefreshToken(userId),
    };
  }
}
