import mongoose from "mongoose";
import app from "./app";
import { config } from "./config/env";

const PORT = config.PORT || 5000;
const MONGO_URI = config.MONGO_URI || "mongodb://localhost:27017/ecotransit";

async function startServer() {
  try {
    // Connect to MongoDB
    console.log("Loaded Mongo URI:", MONGO_URI);

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
}

startServer();
