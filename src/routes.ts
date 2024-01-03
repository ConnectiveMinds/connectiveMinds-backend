import { Router } from "express";

import { userauth } from "./modules/user/v1";

import { calendarroute } from "./modules/calendar/routes/calendar.routes";
import { chat } from "./modules/chat/v1";
import { idearoute } from "./modules/ideas/v1/routes";
import { filerouter } from "./modules/files/routes/files.route";
import { otp } from "./modules/otp/v1";
import { reviewroute } from "./modules/reviews/v1/routes";
import { calendar } from "./modules/calendar";
import { profileroute } from "./modules/userprofile/v1/routes";

export const router = Router();

router.use("/v1/user", userauth);
router.use("/v1/otp", otp);
router.use("/v1/idea", idearoute);
router.use("/v1/calendar", calendar);
router.use("/v1/chat", chat);
router.use("/file", filerouter);

router.use("/v1/review", reviewroute);
router.use("/v1/profile", profileroute);
