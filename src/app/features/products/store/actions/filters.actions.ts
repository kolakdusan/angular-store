import { createAction, props } from '@ngrx/store'

export const updateSearchTerm = createAction(
  '[Filters] Update Search Term',
  props<{ searchTerm: string }>()
)

export const updateCategory = createAction(
  '[Filters] Update Category',
  props<{ category: string }>()
)

export const updatePriceRange = createAction(
  '[Filters] Update Price Range',
  props<{ priceRange: { min: number; max: number } }>()
)

export const resetFilters = createAction('[Filters] Reset Filters')
