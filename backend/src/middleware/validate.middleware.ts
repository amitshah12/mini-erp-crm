import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

type ValidationTarget = "body" | "query" | "params";

export const validate =
  (
    schema: ZodTypeAny,
    target: ValidationTarget = "body"
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return next(result.error);
    }

    req[target] = result.data;

    next();
  };