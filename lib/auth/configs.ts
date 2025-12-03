export const AUTH_CONFIG = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  DOMAIN: process.env.NODE_ENV === 'production' ? '.huyhoang.me' : 'localhost',
}
