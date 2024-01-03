import express from "express";
import { getReviews } from "../controller/get.controller";

export const getreviewroute = express.Router();

getreviewroute.get("/reviews", getReviews);
