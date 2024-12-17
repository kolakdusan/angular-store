import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { CartItem } from '../../types/cartItem.interface'
import { Store } from '@ngrx/store'
import * as CartActions from '../../store/actions/cart.actions'
import { debounceTime, filter } from 'rxjs/operators'

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  faTriangleExclamation = faTriangleExclamation

  @Input() item!: CartItem
  @Output() removeItem = new EventEmitter<number>()

  quantityForm!: FormGroup

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initForm()
    this.initializeFormValueChanges()

    this.quantityForm.statusChanges.subscribe(() => {
      this.store.dispatch(
        CartActions.updateFormError({
          productId: this.item.productId,
          hasError: this.quantityForm.invalid,
        })
      )
    })
  }

  private initForm(): void {
    this.quantityForm = this.fb.group({
      quantity: [
        this.item.quantity,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(this.item.stock),
          Validators.pattern(/^\d+$/),
        ],
      ],
    })
  }

  private initializeFormValueChanges(): void {
    this.quantityForm
      .get('quantity')
      ?.valueChanges.pipe(
        debounceTime(300),
        filter(() => this.quantityForm.valid),
        filter((newQuantity) => newQuantity !== this.item.quantity)
      )
      .subscribe((newQuantity) => {
        this.store.dispatch(
          CartActions.updateQuantity({
            productId: this.item.productId,
            quantity: newQuantity,
          })
        )
      })
  }

  onRemoveItem(): void {
    this.store.dispatch(
      CartActions.removeFromCart({
        productId: this.item.productId,
      })
    )
  }

  get quantityControl() {
    return this.quantityForm.get('quantity')
  }
}
