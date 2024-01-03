import { Router } from "express";
import { uploadFiles } from "../../../../app";
import {
  updateProfileImage,
  updateUserDeatils,
} from "../controllers/crud.controller";

export const crudrouter = Router();

crudrouter.patch(
  "/updateprofile",
  uploadFiles.single("myprofile"),
  updateProfileImage
);
crudrouter.patch("/", updateUserDeatils);
