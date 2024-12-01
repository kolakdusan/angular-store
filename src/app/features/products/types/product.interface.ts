export interface ProductInterface {
  id: number
  name: string
  description: string
  price: number
  thumbnail: string
  category: string
}

export interface ProductDetailsInterface extends ProductInterface {
  images: string[]
}
