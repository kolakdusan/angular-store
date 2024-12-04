import { createReducer, on } from '@ngrx/store'
import { FiltersStateInterface } from './../../types/filtersState.interface'
import * as FiltersActions from '../actions/filters.actions'

export const initialState: FiltersStateInterface = {
  searchTerm: '',
  selectedCategory: '',
  priceRange: {
    min: 0,
    max: 250,
  },
}

export const reducers = createReducer(
  initialState,

  on(FiltersActions.updateSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),

  on(FiltersActions.updateCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category || '',
  })),

  on(FiltersActions.updatePriceRange, (state, { priceRange }) => ({
    ...state,
    priceRange: priceRange || { min: 0, max: 250 },
  })),

  on(FiltersActions.resetFilters, () => ({
    ...initialState,
  }))
)
