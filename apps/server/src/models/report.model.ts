import { Schema, model, Document, Types } from "mongoose";

export interface IReport extends Document {
  userId: Types.ObjectId; // reference to User
  title: string;
  metrics: Record<string, any>; // flexible JSON for report data
  fileUrl: string; // path or URL to stored file
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    metrics: { type: Schema.Types.Mixed, default: {} },
    fileUrl: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

// Indexes for efficient queries
reportSchema.index({ userId: 1, createdAt: -1 });

export const Report = model<IReport>("Report", reportSchema);
