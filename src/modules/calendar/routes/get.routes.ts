import { Router } from "express";
import { getEventByUserId } from "../controller/get.controllers";

export const getRoutes = Router();
getRoutes.get("/", getEventByUserId);
