import { createAction, props } from '@ngrx/store'

export const changePage = createAction(
  '[Pagination] Change Page',
  props<{ pageIndex: number; pageSize: number }>()
)

export const resetPagination = createAction('[Pagination] Reset Pagination')
