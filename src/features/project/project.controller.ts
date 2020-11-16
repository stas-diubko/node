import { Request, Response, NextFunction } from "express";
import * as services from "./project.service";

export const create = (req: Request, res: Response, next: NextFunction) => {
  const project = req.body;
  services
    .create(project)
    .then((result) => res.status(result["status"]).send(result["message"]))
    .catch((err) => {
      next(err);
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const project = req.body;
  services
    .update(project)
    .then((result) => res.status(result["status"]).send(result["message"]))
    .catch((err) => {
      next(err);
    });
};
