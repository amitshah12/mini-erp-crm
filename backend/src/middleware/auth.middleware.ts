import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new ApiError(401, "Authorization header missing");
    }

    if (!authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Invalid authorization format");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);

        req.user = decoded;

        next();
    } catch {
        throw new ApiError(401, "Invalid or expired token");
    }
}