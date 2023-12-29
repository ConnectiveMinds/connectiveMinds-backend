import express from "express";
import { CreateProfile, UpdateProfile } from "../controllers/crud.controller";


export const crudprofileroute = express.Router();

crudprofileroute.post("/createProfile", CreateProfile);
crudprofileroute.patch("/updateprofile",UpdateProfile)
