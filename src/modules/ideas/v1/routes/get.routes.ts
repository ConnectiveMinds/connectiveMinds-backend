import { Router } from "express";
import {
  getIncomingRequest,
  getSentRequest,
  getallprojects,
  getideasbyUserId,
} from "../controller/get.controller";

export const getIdeaRoute = Router();
getIdeaRoute.get("/", getideasbyUserId);
getIdeaRoute.get("/all", getallprojects);
getIdeaRoute.get("/joinrequest", getIncomingRequest);
getIdeaRoute.get("/sentrequest", getSentRequest);
