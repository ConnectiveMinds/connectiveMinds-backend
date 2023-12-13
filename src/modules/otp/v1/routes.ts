import { Router } from "express";
import { crudOtp } from "./routes/crude.routes";

export const router = Router();

router.use(crudOtp);
