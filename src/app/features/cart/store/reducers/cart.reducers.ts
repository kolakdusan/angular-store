import { createReducer, on } from '@ngrx/store'
import { CartStateInterface } from '../../types/cartState.interface'
import * as CartActions from '../actions/cart.actions'

const initialState: CartStateInterface = {
  items: [],
  isLoading: false,
  error: null,
  formErrors: {},
}

export const reducers = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { item }) => {
    const existingItem = state.items.find(
      (cartItem) => cartItem.productId === item.productId
    )

    if (existingItem) {
      const newQuantity = existingItem.quantity + item.quantity

      if (newQuantity <= item.stock) {
        return {
          ...state,
          items: state.items.map((cartItem) =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          ),
        }
      } else {
        console.log('Not enough in stock')
        return {
          ...state,
        }
      }
    } else {
      if (item.quantity <= item.stock) {
        return {
          ...state,
          items: [...state.items, item],
        }
      } else {
        console.log('Not enough in stock')
        return {
          ...state,
        }
      }
    }
  }),
  on(CartActions.removeFromCart, (state, { productId }) => {
    const newFormErrors = Object.fromEntries(
      Object.entries(state.formErrors).filter(
        ([key]) => Number(key) !== productId
      )
    )

    return {
      ...state,
      formErrors: newFormErrors,
      items: state.items.filter((item) => item.productId !== productId),
    }
  }),

  on(CartActions.updateQuantity, (state, { productId, quantity }) => ({
    ...state,
    items: state.items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    ),
  })),
  on(CartActions.clearCart, (state) => ({
    ...state,
    items: [],
  })),

  on(CartActions.loadCart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    isLoading: false,
  })),
  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(CartActions.updateFormError, (state, { productId, hasError }) => ({
    ...state,
    formErrors: {
      ...state.formErrors,
      [productId]: hasError,
    },
  })),

  on(CartActions.clearFormError, (state, { productId }) => {
    const { [productId]: removed, ...remainingErrors } = state.formErrors
    return {
      ...state,
      formErrors: remainingErrors,
    }
  }),

  on(CartActions.clearAllFormErrors, (state) => ({
    ...state,
    formErrors: {}
   })),
)
