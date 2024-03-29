import express, { Express } from "express";
import { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { dbConfig } from "./config/db.config";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
const app: Express = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const allowedOrigins = "*";

const options: cors.CorsOptions = {
  // credentials: true,
  origin: allowedOrigins,
};

const fileStorage = multer.diskStorage({});

export const uploadFiles = multer({
  storage: fileStorage,
});
// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

import { responseMiddleware } from "./middlewares/response.middleware";
app.use(responseMiddleware);
//mongooes database
mongoose.set("strictQuery", true);
mongoose
  .connect(dbConfig.uri!, dbConfig.options as ConnectOptions)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

//test api with http::/localhost:3000/
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, there" });
});
import { getprojectforlandingpage } from "./modules/ideas/v1/controller/get.controller";
app.use("/landing", getprojectforlandingpage);
import { authenticateToken } from "./middlewares/auth.middleware";
//routes
import { router } from "./routes";

app.use("/api", authenticateToken, router);

export { app };
