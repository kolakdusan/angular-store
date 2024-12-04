import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { AppStateInterface } from '../../types/appState.interface'
import * as ProductsActions from '../../store/products.actions'

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
  searchTerm: string = ''

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm
    this.updateRoute(searchTerm)
    this.store.dispatch(ProductsActions.searchProducts({ searchTerm }))
  }

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  private updateRoute(searchTerm: string): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
    })
  }
}
