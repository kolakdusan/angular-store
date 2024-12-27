export interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface DecodedToken {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  exp: number
  iat: number
}
