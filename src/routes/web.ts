import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { categoryRouter } from "./categories";
import { productRouter } from "./product";
import { cartRouter } from "./cart";

export const webRouter = express.Router();

webRouter.use("/auth", authRouter);
webRouter.use("/user", userRouter);
webRouter.use("/categories", categoryRouter);
webRouter.use("/product", productRouter);
webRouter.use("/cart", cartRouter);
webRouter.use(errorMiddleware);