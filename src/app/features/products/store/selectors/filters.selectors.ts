import { createSelector } from '@ngrx/store'
import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'
import { productsSelector } from '../selectors/products.selectors'

export const selectFiltersFeature = (state: ProductsFeatureStateInterface) =>
  state.filters

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

export const sortTypeSelector = createSelector(
  selectFiltersFeature,
  (state) => state.sortType
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

export const sortedProductsSelector = createSelector(
  combinedFilteredProductsSelector,
  sortTypeSelector,
  (filteredProducts, sortType) => {
    if (!sortType) return filteredProducts

    return [...filteredProducts].sort((a, b) => {
      switch (sortType) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })
  }
)

export const hasActiveFiltersSelector = createSelector(
  searchTermSelector,
  selectedCategorySelector,
  priceRangeSelector,
  sortTypeSelector,
  (searchTerm, category, priceRange, sortType) =>
    searchTerm !== '' ||
    category !== '' ||
    (priceRange && (priceRange.min !== 0 || priceRange.max !== 250)) ||
    sortType !== ''
)

export const routerFiltersSelector = createSelector(
  searchTermSelector,
  selectedCategorySelector,
  priceRangeSelector,
  sortTypeSelector,

  (search, category, priceRange, sortType) => {
    return {
      search,
      category,
      priceRange,
      sortType,
    }
  }
)
