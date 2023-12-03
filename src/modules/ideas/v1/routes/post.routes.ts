import express from "express";
import { CreateIdea } from "../controller/idea.controller";
export const postidearoute = express.Router();

postidearoute.post("/", CreateIdea);
