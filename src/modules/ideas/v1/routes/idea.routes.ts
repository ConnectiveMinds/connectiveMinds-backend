import express, { Request, Response } from "express";
import { CreateIdea, IdeaDetail } from "../controller/idea.controller";
const idearouter = express.Router();

idearouter.get("/", IdeaDetail);
idearouter.post("/create", CreateIdea);
export { idearouter };
