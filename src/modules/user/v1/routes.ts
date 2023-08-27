import express from "express"

import { authrouter  } from "./routes/auth.routes"

export const router=express.Router();

authrouter.use("/auth",authrouter)