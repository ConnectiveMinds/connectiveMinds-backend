import express from "express";

import { authrouter } from "./routes/auth.routes";
import { crudrouter } from "./routes/crud.routes";
import { getrouter } from "./routes/get.routes";

export const router = express.Router();

router.use("/auth", authrouter);
router.use("/crud", crudrouter);
router.use("/get", getrouter);
