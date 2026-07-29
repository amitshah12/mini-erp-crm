import { ApiError } from "../utils/ApiError";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { AuthRepository } from "./auth.repository";
import { RegisterInput, LoginInput } from "./auth.validation";

export class AuthService {
  private repository = new AuthRepository();

  async register(data: RegisterInput) {
    const existingUser = await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.repository.createUser({
      ...data,
      password: hashedPassword,
    });

    const { password, ...safeUser } = user;

    return safeUser;
  }

  async login(data: LoginInput) {
    const user = await this.repository.findByEmail(data.email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const passwordMatches = await comparePassword(
      data.password,
      user.password
    );

    if (!passwordMatches) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    const { password, ...safeUser } = user;

    return {
      user: safeUser,
      token,
    };
  }
  async me(userId: string) {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const { password, ...safeUser } = user;

    return safeUser;
  }
}