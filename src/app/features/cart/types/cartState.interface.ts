import { CartItem } from './cartItem.interface'

export interface CartStateInterface {
  items: CartItem[]
  isLoading: boolean
  error: string | null
  formErrors: { [productId: number]: boolean }
}
