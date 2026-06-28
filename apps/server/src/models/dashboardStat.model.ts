import { Schema, model, Document } from "mongoose";

export interface IDashboardStat extends Document {
  date: Date;
  totalPassengers: number;
  avgDelay: number;   // minutes
  co2Saved: number;   // kg CO₂
  createdAt: Date;
  updatedAt: Date;
}

const dashboardStatSchema = new Schema<IDashboardStat>(
  {
    date: { type: Date, required: true },
    totalPassengers: { type: Number, required: true },
    avgDelay: { type: Number, required: true },
    co2Saved: { type: Number, required: true }
  },
  { timestamps: true }
);

// Index for efficient queries by date
dashboardStatSchema.index({ date: 1 });

export const DashboardStat = model<IDashboardStat>("DashboardStat", dashboardStatSchema);
