import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { hasRoleGuard } from 'features/auth/guards/has-role.guard'
import { Role } from 'features/auth/types/role'
import { AboutComponent } from './core/components/about/about.component'

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'arrivals',
    loadChildren: () =>
      import('./features/arrivals/arrivals.module').then(
        (m) => m.ArrivalsModule
      ),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
    canActivate: [hasRoleGuard],
    data: { roles: [Role.USER, Role.ADMIN] },
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '**',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
