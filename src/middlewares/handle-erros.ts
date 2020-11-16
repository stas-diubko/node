import { Request, Response, NextFunction } from "express";
import logger from "../features/utils/logger";
import { AppError } from "../helpers/app-errors";

export const handleErrors = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.statusCode === 401) {
    logger.error(`A stranger tried to illegally ${req.method} @ ${req.url}.`);
    res.status(401).json({
      error: "UNKNOWN_ACCESSOR",
    });
  } 
  else if (error.statusCode === 400) {
    logger.error(`Something was bad for ${req.method} @ ${req.url}.`);
    res.status(400).json({
      error: error.message,
    });
  } else if (error.statusCode === 404) {
    logger.error(`Not found ${req.method} @ ${req.url}.`);
    res.status(404).json({
      error: error.message,
    });
  } else if (error.statusCode === 500) {
    logger.error(`Internal server error for ${req.method} @ ${req.url}.`);
    res.status(500).json({
      error: error.message,
    });
  }
};
