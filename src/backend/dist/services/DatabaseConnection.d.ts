export declare class DatabaseConnection {
    private static instance;
    private connection;
    private constructor();
    static getInstance(): DatabaseConnection;
    connect(uri: string): Promise<void>;
    disconnect(): Promise<void>;
}
