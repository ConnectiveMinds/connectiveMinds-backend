import express, { Request, Response } from "express";
import File, { IDelete } from "../model/files"
import axios from "axios";
import { AuthRequest } from "../../../interface/request.interface";


export const getFiles = async(req:Request,res:Response)=>
{
    try{
    
    const files = await File.find({project_idea:req.params.id});
    if(files)
    {
        res.status(200).json(files);
    }
    else
    {
        res.status(404).json({ message: 'No Files found' });   
    }
    }
    catch(err)
    {
        res.send(err);
    }

}

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
      res.status(500).send("Internal Server Error");
    }
  };
