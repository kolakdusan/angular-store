import { Injectable } from '@angular/core'
import { CartItem } from '../types/cartItem.interface'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_KEY = 'cart'

  getCartItems(): CartItem[] {
    const items = localStorage.getItem(this.CART_KEY)
    return items ? JSON.parse(items) : []
  }

  saveCartItems(items: CartItem[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items))
  }

  clearCart(): void {
    localStorage.removeItem(this.CART_KEY)
  }
}
