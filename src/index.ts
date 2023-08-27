
import { Router } from "express";
import {app} from "./app"
import { idearouter } from "./modules/ideas/v1/routes/idea.routes";
import express from "express";

const PORT = process.env.PORT||3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/',idearouter);

app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`);
});
