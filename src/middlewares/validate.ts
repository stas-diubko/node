import * as yup from "yup";
import { NextFunction, Request, Response } from "express";

export const validate = (model: yup.Schema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let valid:boolean = await model.isValid(req.body);
    if (valid) {
      next();
    } else {
      return res.status(400).send({
        error: "Request body is not valid!",
      });
    }
  };
};
