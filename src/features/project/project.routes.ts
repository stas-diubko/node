import { Router } from "express";
import { create } from "./project.controller";
import { validate } from "../../middlewares/validate";
import { createProgectSchema } from "./validation"

const router = Router();

router.post("/create", validate(createProgectSchema), create);

export default router;
