import { Router } from "express";
import { getMessagesRoute } from "./routes/get.routes";
import { crudmessageroute } from "./routes/crud.routes";

export const chatroute = Router();

chatroute.use("/get", getMessagesRoute);
chatroute.use("/crud", crudmessageroute);
