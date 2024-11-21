import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ProductsPageComponent } from './pages/products-page/products-page.component'
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component'

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
  },
  { path: ':id', component: ProductDetailsPageComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
