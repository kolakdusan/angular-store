import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Observable, forkJoin, of, switchMap } from 'rxjs'

import * as ProductsActions from '../../store/products.actions'
import {
  isLoadingSelector,
  errorSelector,
  productsSelector,
} from '../../store/products.selectors'
import { AppStateInterface } from '../../types/appState.interface'
import { ProductInterface } from '../../types/product.interface'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  products$: Observable<ProductInterface[]>

  constructor(private store: Store<AppStateInterface>, private router: Router) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.products$ = this.store.pipe(
      select(productsSelector),
      switchMap((products) => this.preloadImages(products))
    )
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.getProducts())
  }

  onProductClick(productId: number): void {
    this.router.navigate(['/products', productId])
  }

  private preloadImages(
    products: ProductInterface[]
  ): Observable<ProductInterface[]> {
    if (!products || products.length === 0) {
      return of(products)
    }
    const imageLoaders = products.map(
      (product) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.src = product.thumbnail
          img.onload = () => resolve()
          img.onerror = () => resolve()
        })
    )
    return forkJoin(imageLoaders).pipe(switchMap(() => of(products)))
  }
}
