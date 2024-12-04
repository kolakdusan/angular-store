import { createSelector } from '@ngrx/store'
import { AppStateInterface } from '../../types/appState.interface'
import { combinedFilteredProductsSelector } from './filters.selectors'

export const selectFeature = (state: AppStateInterface) => state.pagination

export const pageIndexSelector = createSelector(
  selectFeature,
  (state) => state.pageIndex
)

export const pageSizeSelector = createSelector(
  selectFeature,
  (state) => state.pageSize
)

export const productsLengthSelector = createSelector(
  combinedFilteredProductsSelector,
  (filteredProducts) => filteredProducts.length
)

export const displayedProductsSelector = createSelector(
  combinedFilteredProductsSelector,
  pageIndexSelector,
  pageSizeSelector,
  (filteredProducts, pageIndex, pageSize) => {
    const startIndex = pageIndex * pageSize
    const endIndex = startIndex + pageSize
    return filteredProducts.slice(startIndex, endIndex)
  }
)

export const totalPagesSelector = createSelector(
  productsLengthSelector,
  pageSizeSelector,
  (length, pageSize) => Math.ceil(length / pageSize)
)
