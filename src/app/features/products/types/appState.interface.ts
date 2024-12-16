import { ProductsStateInterface } from './productsState.interface'
import { PaginationStateInterface } from './paginationState.interface'
import { FiltersStateInterface } from './filtersState.interface'

export interface AppStateInterface {
  products: ProductsStateInterface
  pagination: PaginationStateInterface
  filters: FiltersStateInterface
}
