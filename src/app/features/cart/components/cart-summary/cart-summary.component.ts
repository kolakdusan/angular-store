import { Component, Input, OnDestroy } from '@angular/core'
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations'
import { CartItem } from '../../types/cartItem.interface'
import { Store } from '@ngrx/store'
import { selectHasCartErrors } from 'features/cart/store/selectors/cart.selectors'
import { take } from 'rxjs'
import * as CartActions from '../../store/actions/cart.actions'

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
  animations: [
    trigger('fadeChange', [
      transition(':increment, :decrement', [
        animate(
          '300ms ease',
          keyframes([
            style({ opacity: 0.5, transform: 'translateY(-2px)', offset: 0 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 0.7 }),
            style({ transform: 'translateY(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class CartSummaryComponent implements OnDestroy {
  @Input() items: CartItem[] = []
  hasErrors$ = this.store.select(selectHasCartErrors)

  constructor(private store: Store) {}

  get totalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  get totalPrice(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  ngOnDestroy(): void {
    this.store
      .select(selectHasCartErrors)
      .pipe(take(1))
      .subscribe((hasErrors) => {
        if (hasErrors) {
          this.store.dispatch(CartActions.clearAllFormErrors())
        }
      })
  }
}
