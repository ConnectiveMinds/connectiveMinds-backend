import { Router } from "express";
import { getuser } from "../controllers/get.controller";

export const getrouter = Router();
getrouter.get("/userprofile", getuser);
