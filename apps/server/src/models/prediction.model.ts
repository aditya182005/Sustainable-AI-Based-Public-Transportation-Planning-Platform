import { Schema, model, Document, Types } from "mongoose";

export enum PredictionType {
  DEMAND = "demand",
  DELAY = "delay",
  OCCUPANCY = "occupancy"
}

export interface IPrediction extends Document {
  routeId: Types.ObjectId; // reference to Route
  dateTime: Date;
  type: PredictionType;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

const predictionSchema = new Schema<IPrediction>(
  {
    routeId: { type: Schema.Types.ObjectId, ref: "Route", required: true },
    dateTime: { type: Date, required: true },
    type: { type: String, enum: Object.values(PredictionType), required: true },
    value: { type: Number, required: true }
  },
  { timestamps: true }
);

// Indexes for efficient queries
predictionSchema.index({ routeId: 1, dateTime: 1 });
predictionSchema.index({ type: 1 });

export const Prediction = model<IPrediction>("Prediction", predictionSchema);
