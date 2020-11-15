const express = require("express");

const router = express.Router();

import auth from "./features/auth/auth.routes";
import projects from "./features/project/project.routes";

router.use("/auth", auth);
router.use("/project", projects);

module.exports = router;
