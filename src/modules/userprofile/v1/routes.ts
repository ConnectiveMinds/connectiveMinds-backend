import { Router } from "express";
import { crudprofileroute } from "./routes/crud.routes";
import { getprofileroute } from "./routes/get.routes";


export const profileroute = Router();

profileroute.use("/crud", crudprofileroute)
profileroute.use("/get",getprofileroute)