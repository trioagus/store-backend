import express from "express"
import { ProductReviewController } from "../controllers/product-review.controller"
import { userMiddleware } from "../middleware/auth-middleware"

export const productReviewRouter = express.Router()

const productReviewController = new ProductReviewController()

productReviewRouter.post("/", userMiddleware, productReviewController.createProductReview)
productReviewRouter.put("/:id", userMiddleware, productReviewController.updateProductReview)
productReviewRouter.delete("/:id", userMiddleware, productReviewController.deleteProductReview)
productReviewRouter.get("/:id", productReviewController.getProductReview)
productReviewRouter.get("/", productReviewController.getProductReviews)