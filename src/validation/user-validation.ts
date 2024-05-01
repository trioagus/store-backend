import { z, ZodType } from "zod";

export const userValidation: ZodType<{
    name: string;
    email: string;
    phone: string;
    password: string;
}> = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    password: z.string().min(6).max(20),
});
