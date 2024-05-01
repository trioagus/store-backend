import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";
import { logger } from "../application/logger";

export const errorMiddleware = (
  error: Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    logger.error(error.issues);
    return res.status(400).json(error.issues);
  }
  if (error instanceof ResponseError) {
    logger.error(error.message);
    return res.status(400).json({ message: error.message });
  }
  logger.error(error.message);
  return res.status(500).json({ message: error.message });
};
