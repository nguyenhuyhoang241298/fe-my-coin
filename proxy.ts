import { NextResponse } from 'next/server'
import { auth } from './auth'
import {
  apiPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGOUT_REDIRECT,
  fetchingServerSideDataRoutes,
  publicRoutes,
} from './lib/auth/routes'
import { handleRefreshTokenBeforeExpire } from './lib/auth/serverHelper'

const proxy = auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const hasServerSideDataFetchingRoute = fetchingServerSideDataRoutes.includes(
    nextUrl.pathname,
  )

  if (isApiRoute) {
    return NextResponse.next()
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_LOGOUT_REDIRECT, nextUrl))
  }

  if (isLoggedIn && hasServerSideDataFetchingRoute) {
    return await handleRefreshTokenBeforeExpire(req)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

export default proxy
