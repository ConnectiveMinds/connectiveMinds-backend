import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import File, { IDelete, Iget } from "../model/files";
import axios from "axios";
import { AuthRequest } from "../../../interface/request.interface";

import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

const storage = multer.diskStorage({});

let upload = multer({
  storage,
});
export const getFiles = async (
  req: AuthRequest<{}, {}, Iget>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("rinnung");
    const files = await File.find({ project_idea: req.params?.projectId });
    console.log(files);

    if (files.length > 0) {
      res.status(200).json(files);
    } else {
      res.status(404).json({ message: "No Files found" });
    }
  } catch (err) {
    console.error("Error in getFiles:", err);
    next(err);
  }
};

export const deleteFile = async (
  req: AuthRequest<{}, {}, IDelete>,
  res: Response
) => {
  try {
    const file = await File.findById(req.params?.id);

    if (file) {
      await file.deleteOne(); // Corrected syntax to actually delete the file
      res.send("File Successfully Deleted");
    } else {
      res.status(404).send("No file found");
    }
  } catch (error) {
    console.error(error);
  }
};

export const uploadFile = async (
  req: AuthRequest<Iget>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File should be added" });
    }

    let uploadedFile: UploadApiResponse | undefined;

    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "sharing",
        resource_type: "auto",
      });
    } catch (error: any) {
      return res.status(400).json({ message: "Cloudinary Error" });
    }

    if (!uploadedFile) {
      return res
        .status(400)
        .json({ message: "Cloudinary Error: File not uploaded" });
    }

    // Extract project_id from request parameters
    const project_id = req.body?.projectId;

    if (!project_id) {
      return res
        .status(400)
        .json({ message: "Missing project_id in the request parameters" });
    }

    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;

    const file = await File.create({
      project_id: project_id,
      filename: originalname,
      sizeInByte: bytes.toString(),
      secure_url,
      format,
    });

    res.status(200).json({
      id: file.id,
      downloadPagelink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file.id}`,
    });
  } catch (error: any) {
    console.log("backend");
    console.log(error.message);
    next(error);
  }
};
