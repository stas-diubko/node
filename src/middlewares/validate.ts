import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import logger from "../features/utils/logger";
import { AppError } from "../helpers/app-errors";

export const validate = (model: yup.Schema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let valid: boolean = await model.isValid(req.body);
    if (valid) {
      next();
    } else {
      logger.error("Request body is not valid!");
      throw new AppError(500, "Request body is not valid!");
    }
  };
};
