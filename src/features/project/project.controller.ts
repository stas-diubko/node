import { Request, Response } from "express";
import * as services from "./project.service";

export const create = (req: Request, res: Response) => {
  const project = req.body.project;
  services
    .create(project)
    .then((result) => res.status(result["status"]).send(result["message"]))
    .catch((err) => res.send(err));
};
