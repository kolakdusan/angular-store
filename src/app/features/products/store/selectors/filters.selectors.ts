import { createSelector } from '@ngrx/store'
import { AppStateInterface } from '../../types/appState.interface'
import { productsSelector } from '../selectors/products.selectors'

export const selectFiltersFeature = (state: AppStateInterface) => state.filters

export const searchTermSelector = createSelector(
  selectFiltersFeature,
  (state) => state.searchTerm
)

export const selectedCategorySelector = createSelector(
  selectFiltersFeature,
  (state) => state.selectedCategory
)

export const priceRangeSelector = createSelector(
  selectFiltersFeature,
  (state) => state.priceRange
)

export const combinedFilteredProductsSelector = createSelector(
  productsSelector,
  searchTermSelector,
  selectedCategorySelector,
  priceRangeSelector,
  (products, searchTerm, category, priceRange) => {
    return products.filter((product) => {
      const matchesSearchTerm = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true
      const matchesCategory = category ? product.category === category : true
      const matchesPriceRange = priceRange
        ? product.price >= priceRange.min && product.price <= priceRange.max
        : true
      return matchesSearchTerm && matchesCategory && matchesPriceRange
    })
  }
)
