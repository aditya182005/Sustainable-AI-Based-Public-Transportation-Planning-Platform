import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  // If no route matched, send 404
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
    method: req.method
  });
};
