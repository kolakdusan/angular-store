import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map } from 'rxjs'

import * as ProductsActions from '../actions/products.actions'
import * as FiltersActions from '../actions/filters.actions'
import * as PaginationActions from '../actions/pagination.actions'

@Injectable({ providedIn: 'root' })
export class PaginationEffects {
  resetPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductsActions.getProductsSuccess,
        FiltersActions.updateSearchTerm,
        FiltersActions.updateCategory,
        FiltersActions.updatePriceRange,
        FiltersActions.updateSort,
        FiltersActions.resetFilters
      ),
      map(() => PaginationActions.resetPagination())
    )
  )

  constructor(private actions$: Actions) {}
}
