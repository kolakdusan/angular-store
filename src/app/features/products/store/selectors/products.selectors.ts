import { createSelector } from '@ngrx/store'
import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'

export const selectFeature = (state: ProductsFeatureStateInterface) =>
  state.products

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
)

export const productsSelector = createSelector(
  selectFeature,
  (state) => state.products
)

export const selectedProductSelector = createSelector(
  selectFeature,
  (state) => state.selectedProduct
)

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
)
