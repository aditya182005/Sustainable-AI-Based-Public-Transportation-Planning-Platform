import { Schema, model, Document, Types } from "mongoose";

export interface IBusStop extends Document {
  name: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  routes: Types.ObjectId[]; // references Routes
  createdAt: Date;
  updatedAt: Date;
}

const busStopSchema = new Schema<IBusStop>(
  {
    name: { type: String, required: true, trim: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    routes: [{ type: Schema.Types.ObjectId, ref: "Route" }]
  },
  { timestamps: true }
);

// Geospatial index for location queries
busStopSchema.index({ location: "2dsphere" });

export const BusStop = model<IBusStop>("BusStop", busStopSchema);

