import jwt from "jsonwebtoken";
import { User, IUser, UserRole } from "../models/user.model";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export class AuthService {
  private JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
  private JWT_EXPIRY = process.env.JWT_EXPIRY || "24h";
  private REFRESH_SECRET = process.env.REFRESH_SECRET || "your-refresh-secret";
  private REFRESH_EXPIRY = process.env.REFRESH_EXPIRY || "7d";

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: UserRole = UserRole.PASSENGER
  ): Promise<{ user: IUser; tokens: AuthTokens }> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    await user.save();

    const tokens = this.generateTokens({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return { user: user.toObject({ versionKey: false }), tokens };
  }

  async login(email: string, password: string): Promise<{ user: IUser; tokens: AuthTokens }> {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (!user.isActive) {
      throw new Error("User account is inactive");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const tokens = this.generateTokens({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return { user: user.toObject({ versionKey: false }), tokens };
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const decoded = jwt.verify(refreshToken, this.REFRESH_SECRET) as AuthPayload;

      const user = await User.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw new Error("User not found or inactive");
      }

      const tokens = this.generateTokens({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      return tokens;
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }

  verifyAccessToken(token: string): AuthPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as AuthPayload;
    } catch (error) {
      throw new Error("Invalid or expired access token");
    }
  }

  private generateTokens(payload: AuthPayload): AuthTokens {
    // Cast secrets and options to types expected by jsonwebtoken to satisfy TS overloads
    const accessToken = jwt.sign(
      payload,
      this.JWT_SECRET as unknown as jwt.Secret,
      { expiresIn: this.JWT_EXPIRY as jwt.SignOptions['expiresIn'] }
    );

    const refreshToken = jwt.sign(
      payload,
      this.REFRESH_SECRET as unknown as jwt.Secret,
      { expiresIn: this.REFRESH_EXPIRY as jwt.SignOptions['expiresIn'] }
    );

    return { accessToken, refreshToken };
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId);
  }

  async updateUser(userId: string, updates: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, updates, { new: true });
  }

  async deactivateUser(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { isActive: false });
  }
}

export const authService = new AuthService();
