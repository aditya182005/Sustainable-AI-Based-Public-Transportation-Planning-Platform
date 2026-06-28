import { Request, Response, NextFunction } from "express";
import { authService, AuthPayload } from "../services/auth.service";

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
      return;
    }

    const token = authHeader.substring(7);

    const payload = authService.verifyAccessToken(token);
    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

export const optionalAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const payload = authService.verifyAccessToken(token);
      req.user = payload;
    }

    next();
  } catch (error) {
    next();
  }
};

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: "Forbidden: Insufficient permissions" });
      return;
    }

    next();
  };
};
