import { Router } from "express";

import { userauth } from "./modules/user/v1";

import { claendarroute } from "./modules/calendar/routes/calendar.routes";
import { chatroute } from "./modules/chat/v1/routes";
import { idearoute } from "./modules/ideas/v1/routes";
import { filerouter } from "./modules/files/routes/files.route";
export const router = Router();

router.use("/v1/user", userauth);
router.use("/v1/idea", idearoute);
router.use("/calendar", claendarroute);
router.use("/v1/chat", chatroute);
router.use("/file",filerouter);


