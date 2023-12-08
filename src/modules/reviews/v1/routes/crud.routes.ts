import express from "express";
import { CreateReview } from "../controller/crud.controller";

export const postreviewroute = express.Router();

postreviewroute.post("/", CreateReview);