import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'
import { AppStateInterface } from '../../types/appState.interface'
import * as FiltersActions from '../actions/filters.actions'
import * as PaginationActions from '../actions/pagination.actions'

@Injectable({ providedIn: 'root' })
export class FiltersEffects {
  // resetPagination$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(
  //       FiltersActions.updateSearchTerm,
  //       FiltersActions.updateCategory,
  //       FiltersActions.updatePriceRange,
  //       FiltersActions.resetFilters
  //     ),
  //     map(() => PaginationActions.resetPagination())
  //   )
  // )

  constructor(
    private actions$: Actions,
    private store: Store<AppStateInterface>
  ) {}
}
