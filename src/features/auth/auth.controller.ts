import { Request, Response } from "express";
import * as services from "./auth.service";

export const login = (req: Request, res: Response) => {
    const user = req.body;

    services.login(user)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};