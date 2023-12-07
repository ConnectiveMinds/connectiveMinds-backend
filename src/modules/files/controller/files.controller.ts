import express, { Request, Response } from "express";
import File from "../model/files"
import axios from "axios";


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
