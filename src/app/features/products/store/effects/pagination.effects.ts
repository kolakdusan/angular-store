import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, withLatestFrom } from 'rxjs'

import * as ProductsActions from '../actions/products.actions'
import * as FiltersActions from '../actions/filters.actions'
import * as PaginationActions from '../actions/pagination.actions'
import { combinedFilteredProductsSelector } from '../selectors/filters.selectors'
import { AppStateInterface } from '../../types/appState.interface'
import { ProductInterface } from '../../types/product.interface'

@Injectable({ providedIn: 'root' })
export class PaginationEffects {
  resetPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductsActions.getProductsSuccess,
        FiltersActions.updateSearchTerm,
        FiltersActions.updateCategory,
        FiltersActions.updatePriceRange,
        FiltersActions.resetFilters
      ),
      map(() => PaginationActions.resetPagination())
    )
  )

  constructor(
    private actions$: Actions,
    private store: Store<AppStateInterface>
  ) {}
}
