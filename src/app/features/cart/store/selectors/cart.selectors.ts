import { createSelector, createFeatureSelector } from '@ngrx/store'
import { CartStateInterface } from '../../types/cartState.interface'

export const selectCartState = createFeatureSelector<CartStateInterface>('cart')

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartStateInterface) => state.items
)

export const selectCartItemsCount = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
)

export const selectCartIsLoading = createSelector(
  selectCartState,
  (state: CartStateInterface) => state.isLoading
)

export const selectCartIsEmpty = createSelector(
  selectCartState,
  (state: CartStateInterface) => state.items.length === 0
)

export const selectCartFormErrors = createSelector(
  selectCartState,
  (state) => state.formErrors
)

export const selectHasCartErrors = createSelector(
  selectCartFormErrors,
  (errors) => Object.values(errors).some((hasError) => hasError)
)
