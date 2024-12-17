import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, withLatestFrom, debounceTime } from 'rxjs/operators'

import { FiltersActions } from '../actions/filters.actions'
import * as PaginationActions from '../actions/pagination.actions'
import { routerFiltersSelector } from '../selectors/filters.selectors'
import {
  pageIndexSelector,
  pageSizeSelector,
} from '../selectors/pagination.selectors'
import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'

interface QueryParams {
  search?: string
  category?: string
  minPrice?: string
  maxPrice?: string
  sort?: string
  page?: string
  size?: string
}

@Injectable()
export class RouterEffects {
  updateUrl$ = createEffect(
    () => {
      return this.actions$
        .pipe(
          ofType(...Object.values(FiltersActions), PaginationActions.changePage)
        )
        .pipe(
          debounceTime(300),
          withLatestFrom(
            this.store.select(routerFiltersSelector),
            this.store.select(pageIndexSelector),
            this.store.select(pageSizeSelector)
          ),
          map(
            ([
              _,
              { search, category, priceRange, sortType },
              pageIndex,
              pageSize,
            ]) => {
              const queryParams: QueryParams = {}

              queryParams.search = search || undefined
              queryParams.category = category || undefined
              queryParams.sort = sortType || undefined

              if (
                priceRange &&
                !(priceRange.min === 0 && priceRange.max === 250)
              ) {
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
            }
          )
        )
    },
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private store: Store<ProductsFeatureStateInterface>,
    private router: Router
  ) {}
}
