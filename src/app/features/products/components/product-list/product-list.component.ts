import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Observable, map, switchMap, take } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'

import * as FiltersActions from '../../store/actions/filters.actions'
import * as ProductsActions from '../../store/actions/products.actions'
import * as PaginationActions from '../../store/actions/pagination.actions'
import * as CartActions from '../../../cart/store/actions/cart.actions'

import {
  displayedProductsSelector,
  pageIndexSelector,
  pageSizeSelector,
  productsLengthSelector,
} from '../../store/selectors/pagination.selectors'

import {
  isLoadingSelector,
  errorSelector,
} from '../../store/selectors/products.selectors'

import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'
import { ProductInterface } from '../../types/product.interface'
import { ImagePreloaderService } from '../../../../shared/services/preload-images-service'
import { selectCartItems } from 'features/cart/store/selectors/cart.selectors'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Output() addToCartEvent = new EventEmitter<{
    message: string
    isStockError: boolean
  }>()

  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  displayedProducts$: Observable<ProductInterface[]>
  productsLength$: Observable<number>
  pageIndex$: Observable<number>
  pageSize$: Observable<number>

  constructor(
    private store: Store<ProductsFeatureStateInterface>,
    private router: Router,
    private imagePreloaderService: ImagePreloaderService
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.displayedProducts$ = this.store.pipe(
      select(displayedProductsSelector),
      switchMap((products) =>
        this.imagePreloaderService.preloadImages(products, 'thumbnail')
      )
    )
    this.productsLength$ = this.store.pipe(select(productsLengthSelector))
    this.pageIndex$ = this.store.pipe(select(pageIndexSelector))
    this.pageSize$ = this.store.pipe(select(pageSizeSelector))
  }

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search)

    const search = params.get('search')
    if (search) {
      this.store.dispatch(
        FiltersActions.updateSearchTerm({ searchTerm: search })
      )
    }

    const category = params.get('category')
    if (category) {
      this.store.dispatch(FiltersActions.updateCategory({ category }))
    }

    const minPrice = params.get('minPrice')
    const maxPrice = params.get('maxPrice')
    if (minPrice && maxPrice) {
      this.store.dispatch(
        FiltersActions.updatePriceRange({
          priceRange: {
            min: Number(minPrice),
            max: Number(maxPrice),
          },
        })
      )
    }

    const sort = params.get('sort') as string | null
    const allowedSortTypes = [
      '',
      'price-asc',
      'price-desc',
      'name-asc',
      'name-desc',
    ] as const

    if (
      sort &&
      allowedSortTypes.includes(sort as (typeof allowedSortTypes)[number])
    ) {
      this.store.dispatch(
        FiltersActions.updateSort({
          sortType: sort as (typeof allowedSortTypes)[number],
        })
      )
    }

    const page = params.get('page')
    const size = params.get('size')
    if (page || size) {
      this.store.dispatch(
        PaginationActions.changePage({
          pageIndex: page ? Number(page) - 1 : 0,
          pageSize: size ? Number(size) : 9,
        })
      )
    }
    this.store.dispatch(ProductsActions.getProducts())
  }

  ngOnDestroy(): void {
    this.store.dispatch(FiltersActions.resetFilters())
  }

  handlePageEvent(event: PageEvent) {
    this.store.dispatch(
      PaginationActions.changePage({
        pageIndex: event.pageIndex,
        pageSize: event.pageSize,
      })
    )
    window.scrollTo({ top: 0 })
  }

  onProductClick(productId: number): void {
    this.router.navigate(['/products', productId])
  }
  onAddToCart(productId: number): void {
    this.displayedProducts$
      .pipe(
        take(1),
        select((products) =>
          products.find((product) => product.id === productId)
        ),
        switchMap((product) => {
          if (!product) return []

          return this.store.select(selectCartItems).pipe(
            take(1),
            map((cartItems) => {
              const existingItem = cartItems.find(
                (item) => item.productId === productId
              )
              const currentCartQuantity = existingItem
                ? existingItem.quantity
                : 0
              const availableStock = product.stock

              if (currentCartQuantity + 1 > availableStock) {
                this.addToCartEvent.emit({
                  message: `Not enough in stock for ${product.name}.`,
                  isStockError: true,
                })
                return null
              }

              return {
                productId,
                quantity: 1,
                name: product.name,
                thumbnail: product.thumbnail,
                price: product.price,
                stock: product.stock,
              }
            })
          )
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

  onResetFilters(): void {
    this.store.dispatch(FiltersActions.resetFilters())
  }

  trackByProductId(index: number, product: ProductInterface): number {
    return product.id
  }
}
