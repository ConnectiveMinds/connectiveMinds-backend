import express,{ Request, Response, NextFunction } from 'express';
import multer from "multer";
import {UploadApiResponse,v2 as cloudinary} from 'cloudinary';
import File from "../model/files"
import {  deleteFile, getFiles } from "../controller/files.controller";
const filerouter = express.Router();

const storage = multer.diskStorage({});

let upload = multer(
    {
        storage
    }
)


filerouter.get('/files/:id',getFiles)
filerouter.delete('/delete/:id',deleteFile);


filerouter.post("/upload/:id", upload.single("myFile"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(uploading)
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
      console.log(error.message);
      return res.status(400).json({ message: "Cloudinary Error" });
    }

    if (!uploadedFile) {
      return res.status(400).json({ message: "Cloudinary Error: File not uploaded" });
    }

    const projectId = req.params.id;
    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;

    const file = await File.create({
      project_id: projectId,
      filename: originalname,
      sizeInByte: bytes.toString(), // Corrected field name and converted to string
      secure_url,
      format,
    });

    res.status(200).json({
      id: file.id,
      downloadPagelink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file.id}`,
    });
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
});
 


export 
{
  filerouter
} 