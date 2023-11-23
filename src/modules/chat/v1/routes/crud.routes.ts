import { Router } from "express";
import { savemessage } from "../controllers/chat.controller";

export const crudmessageroute = Router();
crudmessageroute.post("/", savemessage);
