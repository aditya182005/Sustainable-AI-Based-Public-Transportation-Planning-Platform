import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { router as indexRouter } from "./routes/index";
// If middleware files are missing, provide simple fallback handlers
// to avoid build errors while preserving app behavior.
// Replace these with project-specific middleware when available.
const notFoundHandler = (req: express.Request, res: express.Response) => {
	res.status(404).json({ message: "Not Found" });
};

const errorHandler = (
	err: any,
	req: express.Request,
	res: express.Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: express.NextFunction
) => {
	const status = err?.status || 500;
	const message = err?.message || "Internal Server Error";
	res.status(status).json({ message });
};

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use("/api", indexRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
