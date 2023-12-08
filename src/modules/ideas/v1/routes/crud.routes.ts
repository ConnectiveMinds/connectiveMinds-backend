import express from "express";
import {
  CreateIdea,
  acceptRequset,
  updateRequest,
} from "../controller/crud.controller";

export const postidearoute = express.Router();

postidearoute.post("/", CreateIdea);
postidearoute.patch("/:projectId", updateRequest);
postidearoute.patch("/accept/:projectId", acceptRequset);
