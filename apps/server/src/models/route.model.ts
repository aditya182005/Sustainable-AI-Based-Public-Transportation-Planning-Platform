import { Schema, model, Document, Types } from "mongoose";

export interface IRoute extends Document {
  routeNumber: string;
  name: string;
  origin: string;
  destination: string;
  stops: Types.ObjectId[]; // references BusStops
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const routeSchema = new Schema<IRoute>(
  {
    routeNumber: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    stops: [{ type: Schema.Types.ObjectId, ref: "BusStop" }],
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Indexes for faster queries
routeSchema.index({ active: 1 });

export const Route = model<IRoute>("Route", routeSchema);
