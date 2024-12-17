import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

import { reducers as productsReducers } from './features/products/store/reducers/products.reducers'
import { reducers as cartReducers } from './features/cart/store/reducers/cart.reducers'
import { ProductsEffects } from './features/products/store/effects/products.effects'
import { CartEffects } from 'features/cart/store/effects/cart.effects'
import { ProductsService } from './features/products/services/products.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot({
      products: productsReducers,
      cart: cartReducers,
    }),
    EffectsModule.forRoot([ProductsEffects, CartEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [provideHttpClient(), provideAnimationsAsync(), ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
