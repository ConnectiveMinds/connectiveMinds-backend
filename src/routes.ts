import {Router} from "express";

import { userauth } from "./modules/user/v1";
import { idearouter } from "./modules/ideas/v1/routes/idea.routes";
import { claendarroute } from "./modules/calendar/routes/calendar.routes";

export const router =Router();

router.use("/v1/user",userauth);
router.use("/idea",idearouter);
router.use("/calendar",claendarroute);