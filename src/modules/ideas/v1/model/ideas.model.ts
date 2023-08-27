import mongoose from 'mongoose';
import { IIdea } from '../interface';

const IdeaSchema = new mongoose.Schema<IIdea>(
    {
    title:
    {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:
    {
        type:String,
        enum:["open","close"],
        
    },
    skills:
    {
        type:[String],
        
    }

    },
    {
        timestamps:true,
    }
);

export const Idea = mongoose.model<IIdea>('Idea',IdeaSchema);
export const createIdeaDB = (values:Record<string,any>) => new Idea(values).save().then((idea)=>idea.toObject());


