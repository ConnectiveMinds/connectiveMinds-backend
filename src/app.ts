import express, { Express } from "express";
import { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { dbConfig } from "./config/dbConfig";
import cors from "cors";

const app: Express = express();

const allowedOrigins = "*";

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));

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
import { authenticateToken } from "./modules/middlewares/auth.middleware";
//routes
import { router } from "./routes";
app.use("/api", authenticateToken, router);

export { app };
