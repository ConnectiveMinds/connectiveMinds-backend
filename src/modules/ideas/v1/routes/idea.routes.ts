import express,{Request,Response} from "express";
import { CreateIdea, IdeaDetail } from "../controller/idea.controller";
const idearouter = express.Router();


idearouter.get("/idea",IdeaDetail)
idearouter.post("/idea/create",CreateIdea)
export{
    idearouter
    
}
