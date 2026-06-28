import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { UserRole } from "../models/user.model";

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized: User not authenticated" });
      return;
    }

    if (!allowedRoles.includes(req.user.role as UserRole)) {
      res.status(403).json({ 
        error: "Forbidden: Insufficient permissions",
        requiredRoles: allowedRoles,
        userRole: req.user.role,
      });
      return;
    }

    next();
  };
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized: User not authenticated" });
    return;
  }

  if (req.user.role !== UserRole.ADMIN) {
    res.status(403).json({ error: "Forbidden: Admin access required" });
    return;
  }

  next();
};

export const requireOperator = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized: User not authenticated" });
    return;
  }

  if (req.user.role !== UserRole.TRANSIT_OPERATOR) {
    res.status(403).json({ error: "Forbidden: Transit operator access required" });
    return;
  }

  next();
};

export const requirePlanner = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized: User not authenticated" });
    return;
  }

  if (req.user.role !== UserRole.PLANNER) {
    res.status(403).json({ error: "Forbidden: Planner access required" });
    return;
  }

  next();
};

export const requireAdminOrPlanner = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized: User not authenticated" });
    return;
  }

  const allowedRoles = [UserRole.ADMIN, UserRole.PLANNER];
  if (!allowedRoles.includes(req.user.role as UserRole)) {
    res.status(403).json({ error: "Forbidden: Admin or Planner access required" });
    return;
  }

  next();
};
