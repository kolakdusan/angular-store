import { createSelector } from '@ngrx/store'
import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'
import { sortedProductsSelector } from './filters.selectors'

export const selectFeature = (state: ProductsFeatureStateInterface) =>
  state.pagination

export const pageIndexSelector = createSelector(
  selectFeature,
  (state) => state.pageIndex
)

export const pageSizeSelector = createSelector(
  selectFeature,
  (state) => state.pageSize
)

export const productsLengthSelector = createSelector(
  sortedProductsSelector,
  (sortedProducts) => sortedProducts.length
)

export const displayedProductsSelector = createSelector(
  sortedProductsSelector,
  pageIndexSelector,
  pageSizeSelector,
  (sortedProducts, pageIndex, pageSize) => {
    const startIndex = pageIndex * pageSize
    const endIndex = startIndex + pageSize
    return sortedProducts.slice(startIndex, endIndex)
  }
)

export const totalPagesSelector = createSelector(
  productsLengthSelector,
  pageSizeSelector,
  (length, pageSize) => Math.ceil(length / pageSize)
)
