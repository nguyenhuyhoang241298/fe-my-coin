import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(1),
    AUTH_URL: z.string(),
    AUTH_TRUST_HOST: z.string(),
    API_ENDPOINT: z.string(),
    TURNSTILE_SECRET_KEY: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  },

  client: {
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
    NEXT_PUBLIC_AUTH_URL: z.string(),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
})
