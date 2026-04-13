import mongoose, { Schema, Document } from "mongoose";

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

const IdeaProjectSchema = new Schema<IIdeaProject>(
  {
    field: { type: String, required: true },
    intent: { type: String, required: true },
    projectName: { type: String, default: "Untitled Project" },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "completed" },
    analysisData: { type: Schema.Types.Mixed, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const IdeaProjectModel = mongoose.model<IIdeaProject>("IdeaProject", IdeaProjectSchema);
