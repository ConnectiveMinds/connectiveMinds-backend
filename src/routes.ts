import { Router } from "express";

import { userauth } from "./modules/user/v1";
import { idearouter } from "./modules/ideas/v1/routes/idea.routes";
export const router = Router();

router.use("/v1/user", userauth);
router.use("/v1/idea", idearouter);
