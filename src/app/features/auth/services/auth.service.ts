import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { jwtDecode } from 'jwt-decode'
import { Role } from '../types/role'
import { LoginResponse, DecodedToken } from '../types/auth.interfaces'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token'
  private readonly REFRESH_TOKEN_KEY = 'refresh_token'
  private readonly USER_KEY = 'auth_user'

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('https://dummyjson.com/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          console.log('Tap executed, calling handleLoginResponse')
          this.handleLoginResponse(response)
        }),
        catchError((error) => {
          console.error('Login failed:', error)
          return throwError(() => error)
        })
      )
  }

  quickExpiryLogin(
    username: string,
    password: string
  ): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('https://dummyjson.com/auth/login', {
        username,
        password,
        expiresInMins: 1,
      })
      .pipe(
        tap((response) => {
          console.log(
            'Quick expiry login successful, calling handleLoginResponse'
          )
          this.handleLoginResponse(response)
        }),
        catchError((error) => {
          console.error('Login failed:', error)
          return throwError(() => error)
        })
      )
  }

  private handleLoginResponse(response: LoginResponse): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken)
    localStorage.setItem(this.USER_KEY, JSON.stringify(response))
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  isTokenValid(): boolean {
    const token = this.getAccessToken()
    if (!token) {
      this.logout()
      return false
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token)
      const now = Date.now() / 1000
      if (decoded.exp <= now) {
        this.logout()
        return false
      }
      return true
    } catch {
      this.logout()
      return false
    }
  }

  getUserRole(): Role {
    return this.isTokenValid() ? Role.USER : Role.GUEST
  }

  getUsername(): string | null {
    const token = this.getAccessToken()
    if (!token) return null

    try {
      const decoded = jwtDecode<DecodedToken>(token)
      return decoded.username || null
    } catch {
      return null
    }
  }

  getEmail(): string | null {
    const token = this.getAccessToken()
    if (!token) return null

    try {
      const decoded = jwtDecode<DecodedToken>(token)
      return decoded.email || null
    } catch {
      return null
    }
  }

  getFullName(): string | null {
    const token = this.getAccessToken()
    if (!token) return null

    try {
      const decoded = jwtDecode<DecodedToken>(token)
      return decoded.firstName && decoded.lastName
        ? `${decoded.firstName} ${decoded.lastName}`
        : null
    } catch {
      return null
    }
  }

  refreshAccessToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'))
    }

    return this.http
      .post<LoginResponse>('https://dummyjson.com/auth/refresh-token', {
        refreshToken,
      })
      .pipe(
        tap((response) => this.handleLoginResponse(response)),
        catchError((error) => {
          this.logout()
          return throwError(() => error)
        })
      )
  }
}
