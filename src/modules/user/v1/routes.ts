import express from "express"

import { authrouter  } from "./routes/auth.routes"
import { idearouter } from "../../ideas/v1/routes/idea.routes"; 

export const router=express.Router();

router.use("/auth",authrouter);

