import { Router } from "express";
import { uploadFiles } from "../../../../app";
import { updateProfileImage } from "../controllers/crud.controller";

export const crudrouter = Router();

crudrouter.patch(
  "/updateprofile",
  uploadFiles.single("myprofile"),
  updateProfileImage
);
