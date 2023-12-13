import express from "express";
import { GetReviews} from "../controller/get.controller";

export const getreviewroute = express.Router();

getreviewroute.get("/getreviews", GetReviews);
