export declare class JWTService {
    private readonly accessSecret;
    private readonly refreshSecret;
    private readonly accessExpiry;
    private readonly refreshExpiry;
    constructor();
    generateAccessToken(userId: string): string;
    generateRefreshToken(userId: string): string;
    verifyRefreshToken(token: string): {
        userId: string;
    };
    verifyAccessToken(token: string): {
        userId: string;
    };
}
