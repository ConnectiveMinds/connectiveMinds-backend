import { Router } from "express";
import { getallMessages } from "../controllers/chat.controller";

export const getMessagesRoute = Router();
getMessagesRoute.get("/:id", getallMessages);
