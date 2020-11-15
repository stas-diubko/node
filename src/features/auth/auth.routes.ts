import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { login, register } from "./auth.controller";
import { loginSchema, registerSchema } from "./validation";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);

export default router;