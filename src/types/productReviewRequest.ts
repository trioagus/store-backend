export type ProductReviewRequest = {
  id?: string;
  userId: string;
  productId: string;
  rating: number;
  review: string;
};
