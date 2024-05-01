import {z, ZodType} from 'zod'

export const productValidation: ZodType<{
    id?: string
    name: string
    price: number
    categoryId: string
    description: string
    stock: number
    image: string
}> = z.object({
    id: z.string().optional(),
    name: z.string().min(3).max(50),
    price: z.number(),
    categoryId: z.string(),
    description: z.string().min(3).max(100),
    stock: z.number(),
    image: z.string().url()
})