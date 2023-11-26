
import {app} from "./app"

import express from "express";

const PORT = process.env.PORT||3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`);
});
