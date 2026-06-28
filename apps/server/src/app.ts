import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { router as indexRouter } from "./routes/index";
import { authRouter } from "./routes/auth.routes";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";

const app: Application = express();

// Trust proxy when running behind a proxy (Render, Vercel, etc.)
if (process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", true);
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test route (for debugging JSON parsing)
app.all("/test", (req, res) => {
  console.log("Body:", req.body);
  res.json({ received: req.body, method: req.method });
});


// Routes
app.use("/api", indexRouter);
app.use("/api/auth", authRouter);

// CORS
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: CORS_ORIGIN }));

// Security headers
app.use(helmet());

// Logging (skip verbose logging in tests)
if (process.env.NODE_ENV !== "test") {
  const loggerFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
  app.use(morgan(loggerFormat));
}

// Rate limiting (configurable via env)
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 100;
app.use(
  rateLimit({
    windowMs: WINDOW_MS,
    max: RATE_LIMIT_MAX,
  })
);

// Error handling (must be last!)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
