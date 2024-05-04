import { z, ZodType, ZodOptional, ZodString, ZodNumber } from 'zod';

export const shippingValidation: ZodType<{
    city: string;
    regional?: string;
    fee: number;
}> = z.object({
    city: z.string().min(3).max(255),
    regional: z.string().min(3).max(255).optional(),
    fee: z.number(),
});
