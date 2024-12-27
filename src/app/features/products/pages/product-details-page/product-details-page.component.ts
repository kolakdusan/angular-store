import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, switchMap, map, take } from 'rxjs'
import {
  selectedProductSelector,
  isLoadingSelector,
  errorSelector,
} from '../../store/selectors/products.selectors'
import * as ProductsActions from '../../store/actions/products.actions'
import * as CartActions from '../../../cart/store/actions/cart.actions'
import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'
import { ProductDetailsInterface } from '../../types/product.interface'
import { ImagePreloaderService } from '../../../../shared/services/preload-images-service'
import { selectCartItems } from 'features/cart/store/selectors/cart.selectors'

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss',
})
export class ProductDetailsPageComponent implements OnInit {
  @Output() addToCartEvent = new EventEmitter<{
    message: string
    isStockError: boolean
  }>()

  product$: Observable<ProductDetailsInterface | null>
  isLoading$: Observable<boolean>
  error$: Observable<string | null>

  mainImage: string | null = null

  setMainImage(image: string): void {
    this.mainImage = image
  }

  constructor(
    private store: Store<ProductsFeatureStateInterface>,
    private router: Router,
    private route: ActivatedRoute,
    private imagePreloaderService: ImagePreloaderService
  ) {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.error$ = this.store.select(errorSelector)
    this.product$ = this.store.select(selectedProductSelector).pipe(
      switchMap((product) => {
        if (!product) return [null]
        return this.imagePreloaderService
          .preloadImages([product], 'images')
          .pipe(map((products) => products[0]))
      })
    )
  }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!
    this.store.dispatch(ProductsActions.getProductById({ id: productId }))
  }

  onAddToCart(product: ProductDetailsInterface): void {
    this.store
      .select(selectCartItems)
      .pipe(
        take(1),
        map((cartItems) => {
          const existingItem = cartItems.find(
            (item) => item.productId === product.id
          )
          const currentCartQuantity = existingItem ? existingItem.quantity : 0
          const availableStock = product.stock

          if (currentCartQuantity + 1 > availableStock) {
            this.addToCartEvent.emit({
              message: `Not enough in stock for ${product.name}.`,
              isStockError: true,
            })
            return null
          }

          return {
            productId: product.id,
            quantity: 1,
            name: product.name,
            thumbnail: product.images[0], // Using first image as thumbnail
            price: product.price,
            stock: product.stock,
          }
        })
      )
      .subscribe((cartItem) => {
        if (cartItem) {
          this.store.dispatch(CartActions.addToCart({ item: cartItem }))
          this.addToCartEvent.emit({
            message: `Added ${cartItem.name} to cart!`,
            isStockError: false,
          })
        }
      })
  }
}
