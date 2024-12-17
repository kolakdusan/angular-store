import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as CartActions from '../../store/actions/cart.actions'
import {
  selectCartItems,
  selectCartIsLoading,
  selectCartIsEmpty,
} from '../../store/selectors/cart.selectors'
import { CartItem } from '../../types/cartItem.interface'

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartItems$: Observable<CartItem[]>
  isLoading$: Observable<boolean>
  isEmpty$: Observable<boolean>

  constructor(private store: Store) {
    this.cartItems$ = this.store.pipe(select(selectCartItems))
    this.isLoading$ = this.store.pipe(select(selectCartIsLoading))
    this.isEmpty$ = this.store.pipe(select(selectCartIsEmpty))
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart())
  }
}
