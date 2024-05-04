import express from "express";
import { ShippingAddressController } from "../controllers/shipping-address.controller";
import { userMiddleware, isAdmin } from "../middleware/auth-middleware";

export const shippingAddressRouter = express.Router();

const shippingAddressController = new ShippingAddressController();

shippingAddressRouter.post("/", userMiddleware, shippingAddressController.createShippingAddress);
shippingAddressRouter.put("/:id", userMiddleware, shippingAddressController.updateShippingAddress);
shippingAddressRouter.delete("/:id", userMiddleware, shippingAddressController.deleteShippingAddress);
shippingAddressRouter.get("/:userId", userMiddleware, shippingAddressController.getShippingAddressByUserId);
shippingAddressRouter.get("/", isAdmin, shippingAddressController.getShippings)