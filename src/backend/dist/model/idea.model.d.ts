import mongoose, { Document } from "mongoose";
export interface IIdeaProject extends Document {
    field: string;
    intent: string;
    projectName: string;
    status: "pending" | "completed" | "failed";
    analysisData: Record<string, any>;
    creatorId: mongoose.Types.ObjectId;
    generatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const IdeaProjectModel: mongoose.Model<IIdeaProject, {}, {}, {}, mongoose.Document<unknown, {}, IIdeaProject> & IIdeaProject & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
