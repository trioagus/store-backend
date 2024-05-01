import {z, ZodType} from "zod";

export const categoryValidation: ZodType<{
    name: string
}> = z.object({
    name: z.string().min(3).max(50)
})