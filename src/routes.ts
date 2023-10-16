import {Router} from "express";

import { userauth } from "./modules/user/v1";

export const router =Router();

router.use("/v1/user",userauth);
