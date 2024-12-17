import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import * as CartActions from '../actions/cart.actions'
import { tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { CartService } from '../../services/cart.service'
import { selectCartItems } from '../selectors/cart.selectors'
import { of } from 'rxjs'

@Injectable()
export class CartEffects {
  saveCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.addToCart,
          CartActions.removeFromCart,
          CartActions.updateQuantity,
          CartActions.clearCart
        ),
        withLatestFrom(this.store.select(selectCartItems)),
        tap(([action, items]) => {
          if (action.type === CartActions.clearCart.type) {
            this.cartService.clearCart()
          } else {
            this.cartService.saveCartItems(items)
          }
        })
      ),
    { dispatch: false }
  )

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      map(() => {
        const items = this.cartService.getCartItems()
        return CartActions.loadCartSuccess({ items })
      }),
      catchError((error) =>
        of(CartActions.loadCartFailure({ error: error.message }))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private store: Store
  ) {}
}
