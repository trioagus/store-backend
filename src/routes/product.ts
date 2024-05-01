import express from "express";
import { ProductController } from "../controllers/product.controller";
import { uploadPhoto } from "../lib/upload";
import { isAdmin } from "../middleware/auth-middleware";

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/", productController.getproducts);
productRouter.get("/:id", productController.getproductbyid);
productRouter.post("/", isAdmin, uploadPhoto, productController.createproduct);
productRouter.put(
  "/:id",
  isAdmin,
  uploadPhoto,
  productController.updateproduct
);
productRouter.delete("/:id", isAdmin, productController.deleteproduct);
