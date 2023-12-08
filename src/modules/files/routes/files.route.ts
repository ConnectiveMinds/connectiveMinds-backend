import express from "express";
import multer from "multer";
import {UploadApiResponse,v2 as cloudinary} from 'cloudinary';
import File from "../model/files"
import {  getFiles } from "../controller/files.controller";
const filerouter = express.Router();

const storage = multer.diskStorage({});

let upload = multer(
    {
        storage
    }
)


filerouter.get('/files/:id',getFiles)


filerouter.post("/upload/:id",upload.single("myFile"),async (req,res)=>
{
  try{

    if(!req.file)
        return res.status(400).json({message: "File should be Added"});
    console.log(req.file)
    let uploadedFile: UploadApiResponse| undefined;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path,{
        folder:"sharing",
        resource_type:"auto"
      });
    } catch(error:any)
    {
      console.log(error.message);
      res.status(400).json({message: "Cloudinary Error"})

    }
    if (!uploadedFile) {
      return res.status(400).json({ message: "Cloudinary Error: File not uploaded" });
    }
    const projectId = req.params.id;
    const { originalname } = req.file;
    const {secure_url,bytes,format} = uploadedFile;

    const file = await File.create({
      project_idea: projectId,
      filename: originalname,
      sizeInByte: bytes, // Corrected field name
      secure_url,
      format,
      
    });
    
   
    res.status(200).json({
      id:file.id,
      downloadPagelink:`${process.env.API_BASE_ENDPOINT_CLIENT}download/${file.id}`
    })



  } 
  catch(error:any)
  {
    console.log(error.message);
    res.status(500).json({message: "Server Error"})
    
  } 
})
 


export 
{
  filerouter
} 