import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { Role } from '../types/role'

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)
  const userRole: Role = inject(AuthService).getUserRole()
  const expectedRoles: Role[] = route.data['roles']

  const hasRole: boolean = expectedRoles.some((role) => userRole === role)

  return hasRole || router.navigate(['login'])
}
