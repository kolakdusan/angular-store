import { createAction, props } from '@ngrx/store'
import { CartItem } from '../../types/cartItem.interface'

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ item: CartItem }>()
)

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
)

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
)

export const clearCart = createAction('[Cart] Clear Cart')

export const loadCart = createAction('[Cart] Load Cart')

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: CartItem[] }>()
)
export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
)

export const updateFormError = createAction(
  '[Cart] Update Form Error',
  props<{ productId: number; hasError: boolean }>()
)

export const clearFormError = createAction(
  '[Cart] Clear Form Error',
  props<{ productId: number }>()
)

export const clearAllFormErrors = createAction('[Cart] Clear All Form Errors')
