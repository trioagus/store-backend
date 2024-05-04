import express from "express";
import { CartController } from "../controllers/cart.controller";
import { userMiddleware } from "../middleware/auth-middleware";

export const cartRouter = express.Router();

const cartController = new CartController();

cartRouter.post("/", userMiddleware, cartController.addToCart);
cartRouter.put("/:id", userMiddleware, cartController.updateCart);
cartRouter.delete("/:id", userMiddleware, cartController.deleteCart);
cartRouter.get("/", userMiddleware, cartController.getCarts);
cartRouter.get("/:id", userMiddleware, cartController.getCartById)