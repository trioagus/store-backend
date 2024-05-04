import { Request, Response } from "express";
import { ProductReviewService } from "../service/productReview.service";

export class ProductReviewController {
  async createProductReview(req: Request, res: Response) {
    const productReview = req.body;
    try {
      const createdProductReview =
        await ProductReviewService.createProductReview(productReview);
      res.status(201).json(createdProductReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan saat membuat review." });
    }
  }

  async updateProductReview(req: Request, res: Response) {
    const { id } = req.params;
    const productReview = req.body;
    try {
      const updatedProductReview =
        await ProductReviewService.updateProductReview(id, productReview);
      res.status(200).json(updatedProductReview);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengupdate review." });
    }
  }

  async deleteProductReview(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedProductReview =
        await ProductReviewService.deleteProductReview(id);
      res.status(200).json(deletedProductReview);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menghapus review." });
    }
  }

  async getProductReview(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const productReview = await ProductReviewService.getProductReview(id);
      res.status(200).json(productReview);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil review." });
    }
  }

  async getProductReviews(req: Request, res: Response) {
    try {
      const productReviews = await ProductReviewService.getProductReviews();
      res.status(200).json(productReviews);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil review." });
    }
  }
}
