import {z, ZodType} from 'zod'

export const shippingAddressValidation: ZodType<{
    address: string
    city: string
    country: string
    postalCode: string
}> = z.object({
    address: z.string().min(3).max(255),
    city: z.string().min(3).max(255),
    country: z.string().min(3).max(255),
    postalCode: z.string().min(3).max(255),
})