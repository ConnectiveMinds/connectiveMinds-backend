import { Router } from "express";
import { registerUserSchema, loginSchema } from "../schema";
import validateResource from "../middleware/validateResources";
import { registerUser, login } from "../controllers/auth.controller";

export const authrouter = Router();

authrouter.post("/signup", validateResource(registerUserSchema), registerUser);

authrouter.post("/login", validateResource(loginSchema), login);
