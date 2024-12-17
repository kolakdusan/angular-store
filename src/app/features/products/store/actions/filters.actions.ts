import { FiltersStateInterface } from 'features/products/types/filtersState.interface'
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

export const updateSort = createAction(
  '[Filters] Update Sort',
  props<{ sortType: FiltersStateInterface['sortType'] }>()
)

export const resetFilters = createAction('[Filters] Reset Filters')

export const FiltersActions = {
  updateSearchTerm,
  updateCategory,
  updatePriceRange,
  updateSort,
  resetFilters,
}
