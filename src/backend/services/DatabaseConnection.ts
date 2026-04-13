import mongoose from "mongoose";

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: typeof mongoose | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(uri: string): Promise<void> {
    if (this.connection) {
      console.log("[DB] Already connected. Reusing existing connection.");
      return;
    }
    try {
      this.connection = await mongoose.connect(uri);
      console.log("[DB] Connected to MongoDB successfully!");
    } catch (error) {
      console.error("[DB] Connection failed:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      console.log("[DB] Disconnected from MongoDB.");
    }
  }
}
