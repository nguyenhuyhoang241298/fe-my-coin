export const mappingServerCookies = ({
  accessToken,
  refreshToken,
  expiredAt,
}: {
  accessToken: string
  refreshToken: string
  expiredAt: number
}) => {
  if (!accessToken || !refreshToken) return ''

  return `accessToken=${accessToken}; refreshToken=${refreshToken}; expiredAt=${expiredAt}`
}

export const parseSetCookie = (setCookieHeader: string) => {
  const parts = setCookieHeader.split(';').map((part) => part.trim())
  const [nameValue] = parts
  const [name, value] = nameValue.split('=')

  const options: {
    httpOnly?: boolean
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
    maxAge?: number
    path?: string
    domain?: string
  } = {}

  parts.slice(1).forEach((part) => {
    const [key, val] = part.split('=')
    const lowerKey = key.toLowerCase()

    if (lowerKey === 'httponly') options.httpOnly = true
    else if (lowerKey === 'secure') options.secure = true
    else if (lowerKey === 'samesite')
      options.sameSite = val?.toLowerCase() as any
    else if (lowerKey === 'max-age') options.maxAge = parseInt(val)
    else if (lowerKey === 'path') options.path = val
    else if (lowerKey === 'domain') options.domain = val
  })

  return { name, value, options }
}
