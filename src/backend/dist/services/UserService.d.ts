export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface UserPayload {
    email: string;
    username: string;
    password: string;
}
export declare class UserService {
    private readonly jwtService;
    constructor();
    register(payload: UserPayload): Promise<{
        tokens: AuthTokens;
        username: string;
    }>;
    login(email: string, password: string): Promise<{
        tokens: AuthTokens;
        username: string;
    }>;
    refreshAccessToken(refreshToken: string): string;
    getProfile(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../model/user.model").IUser> & import("../model/user.model").IUser & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }) | null>;
    private generateTokens;
}
