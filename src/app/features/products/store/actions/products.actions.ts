import { createAction, props } from '@ngrx/store'
import {
  ProductInterface,
  ProductDetailsInterface,
} from '../../types/product.interface'

// Get products
export const getProducts = createAction('[Products] Get Products')

export const getProductsSuccess = createAction(
  '[Products] Get Products Success',
  props<{ products: ProductInterface[] }>()
)
export const getProductsFailure = createAction(
  '[Products] Get Products Failure',
  props<{ error: string }>()
)

// Get product by Id
export const getProductById = createAction(
  '[Products] Get Product By ID',
  props<{ id: number }>()
)
export const getProductByIdSuccess = createAction(
  '[Products] Get Product By ID Success',
  props<{ product: ProductDetailsInterface }>()
)
export const getProductByIdFailure = createAction(
  '[Products] Get Product By ID Failure',
  props<{ error: string }>()
)

// TODO: (keeping for real API search)
// Search Products
export const searchProducts = createAction(
  '[Products] Search Products',
  props<{ searchTerm: string }>()
)
