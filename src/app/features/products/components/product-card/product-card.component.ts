import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: any
  @Output() idClicked = new EventEmitter<number>()
  @Output() addToCartClicked = new EventEmitter<number>()

  emitId(): void {
    this.idClicked.emit(this.product.id)
  }

  onAddToCart(event: Event): void {
    event.stopPropagation()
    this.addToCartClicked.emit(this.product.id)
  }
}
