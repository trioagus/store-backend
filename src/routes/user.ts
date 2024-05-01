import express from "express";
import { UserController } from "../controllers/user.controller";
import { userMiddleware, isAdmin } from "../middleware/auth-middleware";

export const  userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", isAdmin, userController.getUsers);
userRouter.get("/:id", userMiddleware, userController.getUserById);
userRouter.put("/:id", userMiddleware, userController.updateUser);
userRouter.delete("/:id", userMiddleware,  userController.deleteUser)