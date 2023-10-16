import express, { Express } from "express";
import { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { dbConfig } from "./config/dbConfig";

const app: Express = express();

app.use(express.json());

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

//routes
import { router } from "./routes";
app.use("/api", router);

export { app };
