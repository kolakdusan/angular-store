import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProductsRoutingModule } from './products-routing.module'
import { ProductsPageComponent } from './pages/products-page/products-page.component'
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component'
import { ProductCardComponent } from './components/product-card/product-card.component'
import { ProductListComponent } from './components/product-list/product-list.component'
import { ProductSidebarComponent } from './components/product-sidebar/product-sidebar.component'

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductDetailsPageComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductSidebarComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
