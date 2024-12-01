import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  selectedProductSelector,
  isLoadingSelector,
  errorSelector,
} from '../../store/products.selectors'
import * as ProductsActions from '../../store/products.actions'
import { AppStateInterface } from '../../types/appState.interface'
import { ProductDetailsInterface } from '../../types/product.interface'

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss',
})
export class ProductDetailsPageComponent implements OnInit {
  product$: Observable<ProductDetailsInterface | null>
  isLoading$: Observable<boolean>
  error$: Observable<string | null>

  mainImage: string | null = null

  setMainImage(image: string): void {
    this.mainImage = image
  }

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.product$ = this.store.select(selectedProductSelector)
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.error$ = this.store.select(errorSelector)
  }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!
    this.store.dispatch(ProductsActions.getProductById({ id: productId }))
  }
}
