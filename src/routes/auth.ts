import express from "express";
import { AuthController } from "../controllers/auth.controller";

export const authRouter = express.Router();

const authController = new AuthController();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);