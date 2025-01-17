import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CheckoutRoutingModule } from './checkout-routing.module'
import { CheckoutComponent } from './pages/checkout/checkout.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CheckoutModule {}
