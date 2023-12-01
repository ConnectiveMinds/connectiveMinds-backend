import express from "express";
import { CreateIdea, updateRequest } from "../controller/crud.controller";

export const postidearoute = express.Router();

postidearoute.post("/", CreateIdea);
postidearoute.patch("/:projectId", updateRequest);
