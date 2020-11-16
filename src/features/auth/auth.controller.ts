import { NextFunction, Request, Response } from "express";
import * as services from "./auth.service";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  services
    .login(user)
    .then((result) => res.status(result["status"]).send(result["message"]))
    .catch((err) => next(err));
};

export const register = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  services
    .register(user)
    .then((result) => res.status(result["status"]).send(result["message"]))
    .catch((err) => next(err));
};
