import mongoose, { Schema, Document } from "mongoose";

export interface ILessonPlan extends Document {
  subject: string;
  topic: string;
  grade: string;
  duration: number;
  creatorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILessonPlan>(
  {
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    grade: { type: String, required: true },
    duration: { type: Number, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const LessonPlanModel = mongoose.model<ILessonPlan>("LessonPlan", LessonSchema);
