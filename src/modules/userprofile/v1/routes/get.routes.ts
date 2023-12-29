import { Router } from "express";
import { GetProfile } from "../controllers/get.controller";

 export const getprofileroute = Router();
getprofileroute.get("/",GetProfile)