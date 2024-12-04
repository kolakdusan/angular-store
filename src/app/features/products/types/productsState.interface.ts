import { ProductDetailsInterface, ProductInterface } from './product.interface'

export interface ProductsStateInterface {
  isLoading: boolean
  products: ProductInterface[]
  selectedProduct: ProductDetailsInterface | null
  error: string | null
}
