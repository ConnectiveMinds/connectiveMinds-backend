import express, { Request, Response } from "express";
import { CreateIdea, findGroupsbyUserId } from "../controller/idea.controller";
const idearouter = express.Router();

idearouter.get("/", findGroupsbyUserId);
idearouter.post("/create", CreateIdea);
export { idearouter };
