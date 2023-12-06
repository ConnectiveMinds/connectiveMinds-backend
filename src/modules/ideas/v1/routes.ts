import { Router } from "express";
import { getIdeaRoute } from "./routes/get.routes";
import { postidearoute } from "./routes/crud.routes";

export const idearoute = Router();

idearoute.use("/get", getIdeaRoute);
idearoute.use("/crud", postidearoute);
