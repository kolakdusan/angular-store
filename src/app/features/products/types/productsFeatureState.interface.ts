import { ProductsStateInterface } from './productsState.interface'
import { PaginationStateInterface } from './paginationState.interface'
import { FiltersStateInterface } from './filtersState.interface'

export interface ProductsFeatureStateInterface {
  products: ProductsStateInterface
  pagination: PaginationStateInterface
  filters: FiltersStateInterface
}
