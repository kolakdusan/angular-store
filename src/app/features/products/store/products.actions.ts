import { createAction, props } from '@ngrx/store'
import {
  ProductInterface,
  ProductDetailsInterface,
} from '../types/product.interface'

export const getProducts = createAction('[Products] Get Products')
export const getProductsSuccess = createAction(
  '[Products] Get Products Success',
  props<{ products: ProductInterface[] }>()
)
export const getProductsFailure = createAction(
  '[Products] Get Products Failure',
  props<{ error: string }>()
)

//

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

//

export const getProductsByCategory = createAction(
  '[Products] Get Products By Category',
  props<{ category: string }>()
)
export const getProductsByCategorySuccess = createAction(
  '[Products] Get Products By Category Success',
  props<{ products: ProductInterface[] }>()
)
export const getProductsByCategoryFailure = createAction(
  '[Products] Get Products By Category Failure',
  props<{ error: string }>()
)

//

export const searchProducts = createAction(
  '[Products] Search Products',
  props<{ searchTerm: string }>()
)
export const searchProductsSuccess = createAction(
  '[Products] Search Products Success',
  props<{ products: ProductInterface[]; searchTerm: string }>()
)
export const searchProductsFailure = createAction(
  '[Products] Search Products Failure',
  props<{ error: string }>()
)
