import { Request, Response } from "express";

import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.validation";
import { ApiResponse } from "../utils/ApiResponse";

export class AuthController {
  private service = new AuthService();

  register = async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);

    const user = await this.service.register(data);

    return res.status(201).json(
      ApiResponse.success(
        "User registered successfully",
        user
      )
    );
  };

  login = async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);

    const result = await this.service.login(data);

    return res.status(200).json(
      ApiResponse.success(
        "Login successful",
        result
      )
    );
  };

  me = async (req: Request, res: Response) => {
    const user = await this.service.me(req.user!.id);

    return res.json(
      ApiResponse.success(
        "Current user fetched successfully",
        user
      )
    );
  };

  adminOnly = async (req: Request, res: Response) => {
    return res.json(
      ApiResponse.success(
        "Welcome Admin!",
        {
          user: req.user,
        }
      )
    );
  };
}