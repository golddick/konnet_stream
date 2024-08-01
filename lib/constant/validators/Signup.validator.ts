import * as z from 'zod';

export const SingupFormSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email format", })
  .min(1, "Email is required"),

  displayName: z.string({
    message: 'add Display Name',
  }),
  password: z.string({ message: 'input your password',})
  .min(1, "Password is required")
  .min(8, "Password must be more than 8 characters")
  .max(32, "Password must be less than 32 characters"),
  imageUrl: z.string({
    message: 'add and image url',
  }),
});
