import { Schema, model, Document, Types } from "mongoose";

export interface IMessage {
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface IChatSession extends Document {
  userId: Types.ObjectId; // reference to User
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    role: { type: String, enum: ["user", "bot"], required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { _id: false }
);

const chatSessionSchema = new Schema<IChatSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: [messageSchema]
  },
  { timestamps: true }
);

// Index for efficient queries
chatSessionSchema.index({ userId: 1, createdAt: -1 });

export const ChatSession = model<IChatSession>("ChatSession", chatSessionSchema);
