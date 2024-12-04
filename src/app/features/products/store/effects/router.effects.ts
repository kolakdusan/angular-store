import { Injectable } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { merge } from 'rxjs'
import { filter, map, withLatestFrom, debounceTime } from 'rxjs/operators'

import * as FiltersActions from '../actions/filters.actions'
import * as PaginationActions from '../actions/pagination.actions'
import {
  searchTermSelector,
  selectedCategorySelector,
  priceRangeSelector,
} from '../selectors/filters.selectors'
import {
  pageIndexSelector,
  pageSizeSelector,
} from '../selectors/pagination.selectors'
import { AppStateInterface } from '../../types/appState.interface'

interface QueryParams {
  search?: string
  category?: string
  minPrice?: string
  maxPrice?: string
  page?: string
  size?: string
}

@Injectable()
export class RouterEffects {
  updateUrl$ = createEffect(
    () => {
      return merge(
        this.actions$.pipe(ofType(FiltersActions.updateSearchTerm)),
        this.actions$.pipe(ofType(FiltersActions.updateCategory)),
        this.actions$.pipe(ofType(FiltersActions.updatePriceRange)),
        this.actions$.pipe(ofType(FiltersActions.resetFilters)),
        this.actions$.pipe(ofType(PaginationActions.changePage))
      ).pipe(
        debounceTime(300),
        withLatestFrom(
          this.store.select(searchTermSelector),
          this.store.select(selectedCategorySelector),
          this.store.select(priceRangeSelector),
          this.store.select(pageIndexSelector),
          this.store.select(pageSizeSelector)
        ),
        map(([_, search, category, priceRange, pageIndex, pageSize]) => {
          const queryParams: QueryParams = {}

          if (search && search !== '') queryParams.search = search
          if (category && category !== '') queryParams.category = category
          if (priceRange) {
            queryParams.minPrice = priceRange.min.toString()
            queryParams.maxPrice = priceRange.max.toString()
          }
          if (pageIndex > 0) queryParams.page = (pageIndex + 1).toString()
          if (pageSize !== 9) queryParams.size = pageSize.toString()

          this.router.navigate([], {
            queryParams,
            queryParamsHandling: 'replace',
            replaceUrl: true,
          })
        })
      )
    },
    { dispatch: false }
  )

  syncFromUrl$ = createEffect

  constructor(
    private actions$: Actions,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {}
}
