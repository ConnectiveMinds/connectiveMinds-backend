import { Router } from "express";
import { getIdeaRoute } from "./routes/get.routes";
import { postidearoute } from "./routes/post.routes";

export const idearoute = Router();

idearoute.use("/get", getIdeaRoute);
idearoute.use("/create", postidearoute);
