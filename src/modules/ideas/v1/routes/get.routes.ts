import { Router } from "express";
import { getallprojects, getideasbyUserId } from "../controller/get.controller";

export const getIdeaRoute = Router();
getIdeaRoute.get("/", getideasbyUserId);
getIdeaRoute.get("/all", getallprojects);
