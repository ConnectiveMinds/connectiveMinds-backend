import express, { Request, Response, NextFunction, request } from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File, { IFile } from "../model/files";
import {
  deleteFile,
  getFiles,
  uploadFile,
} from "../controller/files.controller";
import { AuthRequest } from "../../../interface/request.interface";
import mongoose from "mongoose";
import { uploadFiles } from "../../../app";
const filerouter = express.Router();

const storage = multer.diskStorage({});
let upload = multer({
  storage,
});
filerouter.get("/files/:projectId", getFiles);
filerouter.delete("/delete/:id", deleteFile);

filerouter.post("/upload/", uploadFiles.single("file"), uploadFile);

export { filerouter };
