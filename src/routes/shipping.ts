import express from "express";
import { ShippingController } from "../controllers/shipping.controller";
import { isAdmin } from "../middleware/auth-middleware";

export const shippingRouter = express.Router();

const shippingController = new ShippingController();

shippingRouter.post("/", isAdmin, shippingController.createShipping);
shippingRouter.put("/:id", isAdmin, shippingController.updateShipping);
shippingRouter.delete("/:id", isAdmin, shippingController.deleteShipping);
shippingRouter.get("/", shippingController.getShippings);
shippingRouter.get("/:id", shippingController.getShipping);
