import express,{Request,Response} from "express";
import  {Idea,  createIdeaDB } from "../model/ideas.model";

const IdeaDetail = async (req:Request,res:Response)=>
{
    let data = await Idea.find();
    res.json(
        {
            data:data
        }
    )
}
export const CreateIdea =async (req:Request,res:Response) => {
    
        const {title,description,status,skills} = req.body;
        const idea = await createIdeaDB({
            title,
            description,
            skills,
            status
        });
        res.json(idea);
       
    
    
}
export{
    IdeaDetail
}