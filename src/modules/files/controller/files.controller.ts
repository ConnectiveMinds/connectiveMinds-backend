import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import File, { IDelete, Iget } from "../model/files"
import axios from "axios";
import { AuthRequest } from "../../../interface/request.interface";

import {UploadApiResponse,v2 as cloudinary} from 'cloudinary';

const storage = multer.diskStorage({});

let upload = multer(
    {
        storage
    }
)
export const getFiles = async (req: AuthRequest<{},{},Iget>, res: Response,next:NextFunction) => {
  try {
    console.log("rinnung")
    const files = await File.find({ project_idea: req.params?.projectId });
    console.log(files)

    if (files.length > 0) {
      res.status(200).json(files);
    } else {
      res.status(404).json({ message: 'No Files found' });
    }
  } catch (err) {
    console.error('Error in getFiles:', err);
    next(err);
  }
};

export const deleteFile = async (req: AuthRequest<{}, {}, IDelete>, res: Response) => {
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

 