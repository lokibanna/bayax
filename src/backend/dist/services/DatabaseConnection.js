"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DatabaseConnection {
    constructor() {
        this.connection = null;
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    async connect(uri) {
        if (this.connection) {
            console.log("[DB] Already connected. Reusing existing connection.");
            return;
        }
        try {
            this.connection = await mongoose_1.default.connect(uri);
            console.log("[DB] Connected to MongoDB successfully!");
        }
        catch (error) {
            console.error("[DB] Connection failed:", error);
            throw error;
        }
    }
    async disconnect() {
        if (this.connection) {
            await mongoose_1.default.disconnect();
            this.connection = null;
            console.log("[DB] Disconnected from MongoDB.");
        }
    }
}
exports.DatabaseConnection = DatabaseConnection;
