import { createReducer, on } from '@ngrx/store'
import { ProductsStateInterface } from '../../types/productsState.interface'
import * as ProductsActions from '../actions/products.actions'
import { ProductInterface } from '../../types/product.interface'

export const initialState: ProductsStateInterface = {
  isLoading: false,
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  error: null,
}

export const reducers = createReducer(
  initialState,

  // Get products
  on(ProductsActions.getProducts, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(ProductsActions.getProductsSuccess, (state, { products }) => {
    const filteredProducts = products

    return {
      ...state,
      isLoading: false,
      products,
      filteredProducts,
    }
  }),

  on(ProductsActions.getProductsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Get product by id
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

  // Search products
  on(ProductsActions.searchProducts, (state, { searchTerm }) => {
    const filteredProducts = state.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return {
      ...state,
      filteredProducts,
      isLoading: false,
    }
  })
)
