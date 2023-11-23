import mongoose from "mongoose";

export interface IIdea {
    owner: mongoose.Types.ObjectId,
    title:string,
    description:string,
    status: "open" | "close" ,
    skills:[string],
    
}
