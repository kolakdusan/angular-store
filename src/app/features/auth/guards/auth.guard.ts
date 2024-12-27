import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Role } from '../types/role'

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)
  const authService: AuthService = inject(AuthService)

  if (!authService.isTokenValid()) {
    console.log(123)
    const returnUrl = state.url
    router.navigate(['/login'], { queryParams: { returnUrl } })
    return false
  }

  const userRole: Role = authService.getUserRole()
  const expectedRoles: Role[] = route.data['roles']

  const hasRole: boolean = expectedRoles.some((role) => userRole === role)

  if (!hasRole) {
    router.navigate(['/login'])
    return false
  }

  return true
}
