import { prisma } from "../application/db";
import { ProductReviewRequest } from "../types/productReviewRequest";
import { productReviewValidation } from "../validation/product-review-validation";

export class ProductReviewService {
  static async createProductReview(productReview: ProductReviewRequest) {
    const { userId, productId, rating, review } = productReview;
    const validation = productReviewValidation.parse(productReview);
    if (!validation) {
      throw new Error(`Data review tidak valid`);
    }
    try {
      const createdProductReview = await prisma.productReview.create({
        data: {
          userId,
          productId,
          rating,
          review,
        },
      });

      return createdProductReview;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat membuat review.");
    }
  }

  static async updateProductReview(
    id: string,
    productReview: ProductReviewRequest
  ) {
    const { userId, productId, rating, review } = productReview;
    const validation = productReviewValidation.parse(productReview);
    if (!validation) {
      throw new Error(`Data review tidak valid`);
    }
    try {
      const updatedProductReview = await prisma.productReview.update({
        where: {
          id,
        },
        data: {
          userId,
          productId,
          rating,
          review,
        },
      });
      return updatedProductReview;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengupdate review.");
    }
  }

  static async deleteProductReview(id: string) {
    try {
      const deletedProductReview = await prisma.productReview.delete({
        where: {
          id,
        },
      });
      return deletedProductReview;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat menghapus review.");
    }
  }

  static async getProductReview(id: string) {
    try {
      const productReview = await prisma.productReview.findUnique({
        where: {
          id,
        },
      });
      return productReview;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengambil review.");
    }
  }

  static async getProductReviews() {
    try {
      const productReviews = await prisma.productReview.findMany();
      return productReviews;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengambil review.");
    }
  }
}
