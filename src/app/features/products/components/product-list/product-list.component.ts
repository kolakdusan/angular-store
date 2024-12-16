import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Observable, switchMap } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'

import * as FiltersActions from '../../store/actions/filters.actions'
import * as ProductsActions from '../../store/actions/products.actions'
import * as PaginationActions from '../../store/actions/pagination.actions'

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

import { AppStateInterface } from '../../types/appState.interface'
import { ProductInterface } from '../../types/product.interface'
import { ImagePreloaderService } from '../../../../shared/services/preload-images-service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  displayedProducts$: Observable<ProductInterface[]>
  productsLength$: Observable<number>
  pageIndex$: Observable<number>
  pageSize$: Observable<number>

  constructor(
    private store: Store<AppStateInterface>,
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
    this.store.dispatch(ProductsActions.getProducts())
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

  onResetFilters(): void {
    this.store.dispatch(FiltersActions.resetFilters())
  }

  trackByProductId(index: number, product: ProductInterface): number {
    return product.id
  }
}
