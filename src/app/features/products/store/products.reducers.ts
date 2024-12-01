import { createReducer, on } from '@ngrx/store'
import { ProductsStateInterface } from './../types/productsState.interface'
import * as ProductsActions from './products.actions'

export const initialState: ProductsStateInterface = {
  isLoading: false,
  products: [],
  selectedProduct: null,
  error: null,
}

export const reducers = createReducer(
  initialState,
  on(ProductsActions.getProducts, (state) => ({ ...state, isLoading: true })),
  on(ProductsActions.getProductsSuccess, (state, { products }) => ({
    ...state,
    isLoading: false,
    products,
  })),
  on(ProductsActions.getProductsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(ProductsActions.getProductById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProductsActions.getProductByIdSuccess, (state, { product }) => ({
    ...state,
    isLoading: false,
    selectedProduct: product,
  })),
  on(ProductsActions.getProductByIdFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(ProductsActions.getProductsByCategory, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProductsActions.getProductsByCategorySuccess, (state, { products }) => ({
    ...state,
    products,
    isLoading: false,
  })),
  on(ProductsActions.getProductsByCategoryFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(ProductsActions.searchProducts, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    ProductsActions.searchProductsSuccess,
    (state, { products, searchTerm }) => {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

      return {
        ...state,
        products: filteredProducts,
        isLoading: false,
      }
    }
  ),
  on(ProductsActions.searchProductsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
)
