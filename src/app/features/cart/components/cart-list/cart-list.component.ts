import { Component, Input } from '@angular/core'
import { CartItem } from '../../types/cartItem.interface'
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  group,
} from '@angular/animations'

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition(':decrement, :increment', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              marginTop: 0,
              paddingTop: 0,
              overflow: 'hidden',
              borderTopColor: 'transparent',
            }),
            stagger(50, [
              group([
                animate(
                  '150ms ease',
                  style({
                    height: '*',
                    marginTop: '*',
                    paddingTop: '*',
                    borderTopColor: '*',
                  })
                ),
                animate(
                  '150ms ease',
                  style({
                    opacity: 1,
                  })
                ),
              ]),
            ]),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ overflow: 'hidden' }),
            group([
              animate(
                '150ms ease',
                style({
                  opacity: 0,
                })
              ),
              animate(
                '150ms ease',
                style({
                  height: 0,
                  marginTop: 0,
                  paddingTop: 0,
                  borderTopColor: 'transparent',
                })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class CartListComponent {
  @Input() items: CartItem[] = []

  trackByProductId(index: number, item: CartItem): number {
    return item.productId
  }
}
