import { Router } from "express";
import { getRoutes } from "./routes/get.routes";
import { calendarroute } from "./routes/calendar.routes";
export const router = Router();

router.use("/get", getRoutes);
router.use("/crud", calendarroute);
