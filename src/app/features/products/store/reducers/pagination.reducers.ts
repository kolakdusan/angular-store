import { createReducer, on } from '@ngrx/store'
import { PaginationStateInterface } from '../../types/paginationState.interface'
import * as PaginationActions from '../actions/pagination.actions'

const initialPaginationState: PaginationStateInterface = {
  pageIndex: 0,
  pageSize: 9,
}

export const reducers = createReducer(
  initialPaginationState,

  on(PaginationActions.changePage, (state, { pageIndex, pageSize }) => ({
    ...state,
    pageIndex,
    pageSize,
  })),

  on(PaginationActions.resetPagination, (state) => ({
    ...state,
    pageIndex: 0,
  }))
)
