import { Component } from '@angular/core'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

import { CATEGORIES } from '../../../../shared/data/constants'

import { Store } from '@ngrx/store'

import { AppStateInterface } from '../../types/appState.interface'
import * as ProductsActions from '../../store/products.actions'

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrl: './product-sidebar.component.scss',
})
export class ProductSidebarComponent {
  faLayerGroup = faLayerGroup

  selectedCategory: string = 'All'

  categories = CATEGORIES

  setCategory(category: string): void {
    this.selectedCategory = category

    if (category === 'All') {
      this.store.dispatch(ProductsActions.getProducts())
    } else {
      this.store.dispatch(ProductsActions.getProductsByCategory({ category }))
    }
  }

  constructor(private store: Store<AppStateInterface>) {}
}
