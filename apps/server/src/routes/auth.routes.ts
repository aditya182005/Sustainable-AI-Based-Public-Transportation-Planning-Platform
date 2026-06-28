import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();

// Public routes
router.post("/register", (req, res, next) => authController.register(req, res, next));
router.post("/login", (req, res, next) => authController.login(req, res, next));
router.post("/refresh", (req, res, next) => authController.refreshToken(req, res));

// Protected routes
router.post("/logout", authMiddleware, (req, res, next) => authController.logout(req, res));
router.get("/profile", authMiddleware, (req, res, next) => authController.getProfile(req, res));
router.put("/profile", authMiddleware, (req, res, next) => authController.updateProfile(req, res));

export { router as authRouter };
