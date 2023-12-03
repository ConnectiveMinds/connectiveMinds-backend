import { Router } from "express";
import { getideasbyUserId } from "../controller/idea.controller";

export const getIdeaRoute = Router();
getIdeaRoute.get("/", getideasbyUserId);
