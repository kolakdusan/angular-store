import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { faAngleDown, faSliders } from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs'

import * as FiltersActions from '../../store/actions/filters.actions'
import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'
import { hasActiveFiltersSelector } from 'features/products/store/selectors/filters.selectors'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  faSliders = faSliders
  faAngleDown = faAngleDown

  isHidden = true
  hasActiveFilters$ = this.store.select(hasActiveFiltersSelector)

  constructor(private store: Store<ProductsFeatureStateInterface>) {}

  toggleFilters(): void {
    // this.isHidden = window.innerWidth < 768
    this.isHidden = !this.isHidden
  }

  onClearFilters(): void {
    this.store.dispatch(FiltersActions.resetFilters())
  }
}
