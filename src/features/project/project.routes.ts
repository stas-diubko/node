import { Router } from "express";
import { create } from "./project.controller";
import { validate } from "../../middlewares/validate";
import { createProgectSchema, updateProgectSchema } from "./validation"
import { update } from "./project.controller";

const router = Router();

router.post("/", validate(createProgectSchema), create);
router.put("/", validate(updateProgectSchema), update);

export default router;
