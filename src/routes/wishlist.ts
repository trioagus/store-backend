import express from "express";
import { WishlistController } from "../controllers/wishlist.controller";
import { userMiddleware } from "../middleware/auth-middleware";

export const wishlistRouter = express.Router();

const wishlistController = new WishlistController();

wishlistRouter.post("/", userMiddleware, wishlistController.createWishlist);
wishlistRouter.get("/", userMiddleware, wishlistController.getWishlists);
wishlistRouter.get("/:id", userMiddleware, wishlistController.getWishlist);
wishlistRouter.delete("/:id", userMiddleware, wishlistController.deleteWishlist)