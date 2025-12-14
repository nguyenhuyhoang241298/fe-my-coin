import { z } from 'zod'

export const userSchema = z.object({
  id: z.number().int().positive(),
  fullName: z.string().nullable().optional(),
  phone: z.string().max(256).nullable().optional(),
  email: z.email().max(256),
  salt: z.string(),
  isEmailVerified: z.boolean().default(false),
  otp: z.string().length(6),
  image: z.string().max(512).nullable().optional(),
  twoFAEnabled: z.boolean().default(false),
  twoFASecret: z.string().nullable().optional(),
})

export type User = z.infer<typeof userSchema>
