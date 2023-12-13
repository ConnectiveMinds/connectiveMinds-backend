import { Router } from "express";
import { getMessagesRoute } from "./routes/get.routes";
import { crudmessageroute } from "./routes/crud.routes";

export const router = Router();

router.use("/get", getMessagesRoute);
router.use("/crud", crudmessageroute);
