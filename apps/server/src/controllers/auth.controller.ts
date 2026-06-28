import { Request, Response, NextFunction } from "express";

export const authController = {
  // Register new user (mock)
  register: (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Request body:", req.body);
      const { name, email, password, preferredLanguage } = req.body || {};

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = {
        id: Date.now(),
        name: name || "Anonymous",
        email,
        preferredLanguage: preferredLanguage || "en"
      };

      res.status(201).json({
        message: "User registered successfully (mock)",
        user
      });
    } catch (err) {
      next(err);
    }
  },

  // Login (mock JWT)
  login: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body || {};

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      res.json({
        message: "Login successful (mock)",
        token: "mock-jwt-token"
      });
    } catch (err) {
      next(err);
    }
  },

  // Refresh token (mock)
  refreshToken: (req: Request, res: Response) => {
    res.json({ token: "new-mock-jwt-token" });
  },

  // Logout (mock)
  logout: (req: Request, res: Response) => {
    res.json({ message: "Logged out successfully (mock)" });
  },

  // Get profile (mock)
  getProfile: (req: Request, res: Response) => {
    res.json({
      user: {
        id: 1,
        name: "Aditya",
        email: "aditya@example.com",
        preferredLanguage: "en"
      }
    });
  },

  // Update profile (mock)
  updateProfile: (req: Request, res: Response) => {
    res.json({
      message: "Profile updated successfully (mock)",
      updates: req.body
    });
  }
};
