import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/ecotransit",
  JWT_SECRET: process.env.JWT_SECRET || "supersecret",
  TRUST_PROXY: process.env.TRUST_PROXY === "true",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS
    ? Number(process.env.RATE_LIMIT_WINDOW_MS)
    : 15 * 60 * 1000,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX
    ? Number(process.env.RATE_LIMIT_MAX)
    : 100,
};
