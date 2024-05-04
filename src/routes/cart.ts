import express from "express";
import { CartController } from "../controllers/cart.controller";

export const cartRouter = express.Router();

const cartController = new CartController();

cartRouter.post("/", cartController.addToCart);
cartRouter.put("/:id", cartController.updateCart);
cartRouter.delete("/:id", cartController.deleteCart);
cartRouter.get("/", cartController.getCarts);
cartRouter.get("/:id", cartController.getCartById)