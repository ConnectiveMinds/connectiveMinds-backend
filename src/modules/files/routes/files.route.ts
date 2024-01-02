import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File, { IFile, Iget } from "../model/files";
import {
  deleteFile,
  getFiles,
  uploadFile,
} from "../controller/files.controller";
import { AuthRequest } from "../../../interface/request.interface";
import mongoose from "mongoose";
const filerouter = express.Router();

const storage = multer.diskStorage({});
export interface IPost extends IFile {
  projectId: mongoose.Schema.Types.ObjectId;
}

let upload = multer({
  storage,
});

filerouter.get("/files/:id", getFiles);
filerouter.delete("/delete/:id", deleteFile);

filerouter.post("/upload/:projectId", upload.single("myFile"), uploadFile);

export { filerouter };
