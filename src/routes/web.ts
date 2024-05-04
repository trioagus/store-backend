import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { categoryRouter } from "./categories";
import { productRouter } from "./product";
import { cartRouter } from "./cart";
import { shippingAddressRouter } from "./shippingAddress";
import { shippingRouter } from "./shipping";
import { productReviewRouter } from "./productReview";
import { wishlistRouter } from "./wishlist";

export const webRouter = express.Router();

webRouter.use("/auth", authRouter);
webRouter.use("/user", userRouter);
webRouter.use("/categories", categoryRouter);
webRouter.use("/product", productRouter);
webRouter.use("/cart", cartRouter);
webRouter.use("/shipping-address", shippingAddressRouter);
webRouter.use("/shipping", shippingRouter);
webRouter.use("/product-review", productReviewRouter);
webRouter.use("/wishlist", wishlistRouter);
webRouter.use(errorMiddleware);