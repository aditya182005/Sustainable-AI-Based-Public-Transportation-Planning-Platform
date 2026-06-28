import { Schema, model, Document, Types } from "mongoose";

export interface ISustainabilityMetric extends Document {
  routeId: Types.ObjectId; // reference to Route
  date: Date;
  co2Emissions: number; // kg CO₂
  fuelUsage: number;    // liters
  efficiencyScore: number; // normalized 0–1
  createdAt: Date;
  updatedAt: Date;
}

const sustainabilityMetricSchema = new Schema<ISustainabilityMetric>(
  {
    routeId: { type: Schema.Types.ObjectId, ref: "Route", required: true },
    date: { type: Date, required: true },
    co2Emissions: { type: Number, required: true },
    fuelUsage: { type: Number, required: true },
    efficiencyScore: { type: Number, required: true, min: 0, max: 1 }
  },
  { timestamps: true }
);

// Indexes for efficient queries
sustainabilityMetricSchema.index({ routeId: 1, date: 1 });

export const SustainabilityMetric = model<ISustainabilityMetric>(
  "SustainabilityMetric",
  sustainabilityMetricSchema
);
