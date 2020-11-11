import { Router } from "express";
import { create } from "./project.controller";

const router = Router();

router.post("/create", create);

export default router;
