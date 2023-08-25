import express, {Express} from "express";
import mongoose,{ConnectOptions} from "mongoose";
import { dbConfig } from "./config/dbConfig";

const app :Express= express();

//mongooes database
mongoose.set("strictQuery", true);
 mongoose.connect(dbConfig.uri! ,dbConfig.options as ConnectOptions).then(()=>{
    console.log("Database Connected");
 }).catch ((error)=>{
    console.log(error);
 })

export {app};
