const { Router } = require("express");
import type { Request, Response } from "express";

export const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "EcoTransit AI backend healthy" });
});

module.exports = { router };

