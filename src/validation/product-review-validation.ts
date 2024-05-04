import { z, ZodType } from "zod";

export const productReviewValidation:ZodType<{
  rating: number
  review: string

}> = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().max(255)
})

