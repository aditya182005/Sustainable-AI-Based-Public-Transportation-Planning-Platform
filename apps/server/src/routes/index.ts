import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import { Route } from "../models/route.model";
import { BusStop } from "../models/busStop.model";
import { Prediction } from "../models/prediction.model";
import { SustainabilityMetric } from "../models/sustainabilityMetric.model";
import { Report } from "../models/report.model";
import { ChatSession } from "../models/chatSession.model";
import { DashboardStat } from "../models/dashboardStat.model";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "EcoTransit AI backend healthy" });
});
/* ---------------- USERS ---------------- */
router.post("/auth/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/* ---------------- ROUTES ---------------- */
router.post("/routes", async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/routes", async (_req, res) => {
  const routes = await Route.find().populate("stops");
  res.json(routes);
});

/* ---------------- BUS STOPS ---------------- */
router.post("/busStops", async (req, res) => {
  try {
    const busStop = new BusStop(req.body);
    await busStop.save();
    res.status(201).json(busStop);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/* ---------------- PREDICTIONS ---------------- */
router.get("/predictions/:routeId", async (req, res) => {
  const { routeId } = req.params;
  const predictions = await Prediction.find({ routeId }).sort({ dateTime: -1 });
  res.json(predictions);
});

/* ---------------- SUSTAINABILITY METRICS ---------------- */
router.get("/metrics/:routeId", async (req, res) => {
  const { routeId } = req.params;
  const metrics = await SustainabilityMetric.find({ routeId }).sort({ date: -1 });
  res.json(metrics);
});

/* ---------------- REPORTS ---------------- */
router.get("/reports/:userId", async (req, res) => {
  const { userId } = req.params;
  const reports = await Report.find({ userId }).sort({ createdAt: -1 });
  res.json(reports);
});

/* ---------------- CHAT SESSIONS ---------------- */
router.post("/chatSessions", async (req, res) => {
  try {
    const chatSession = new ChatSession(req.body);
    await chatSession.save();
    res.status(201).json(chatSession);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/* ---------------- DASHBOARD STATS ---------------- */
router.get("/dashboardStats", async (_req, res) => {
  const stats = await DashboardStat.find().sort({ date: -1 }).limit(7);
  res.json(stats);
});

export { router };


