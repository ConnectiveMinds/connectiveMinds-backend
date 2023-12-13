import { Router } from "express";

import { postreviewroute } from "./routes/crud.routes";
import { idearoute } from "../../ideas/v1/routes";
import { getreviewroute } from "./routes/get.routes";

export const reviewroute = Router();

reviewroute.use("/crud", postreviewroute);
reviewroute.use("/get", getreviewroute);