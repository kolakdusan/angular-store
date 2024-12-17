import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CartPageComponent } from './pages/cart-page/cart-page.component'
import { CartRoutingModule } from './cart-routing.module'
import { CartItemComponent } from './components/cart-item/cart-item.component'
import { CartListComponent } from './components/cart-list/cart-list.component'
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component'
import { SharedModule } from 'shared/shared.module'
import { CartEmptyComponent } from './components/cart-empty/cart-empty.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    CartPageComponent,
    CartItemComponent,
    CartListComponent,
    CartSummaryComponent,
    CartEmptyComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class CartModule {}
