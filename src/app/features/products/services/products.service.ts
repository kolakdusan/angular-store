import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import {
  ProductInterface,
  ProductDetailsInterface,
} from '../types/product.interface'
import { HttpClient } from '@angular/common/http'

import { CATEGORIES } from '../../../shared/data/constants'

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductInterface[]> {
    let apiUrl = 'https://dummyjson.com/products?limit=300'

    return this.http.get<{ products: any[] }>(apiUrl).pipe(
      map((response) =>
        response.products
          .map((product) => ({
            id: product.id,
            name: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            category: product.category,
          }))
          .filter((product) => {
            return CATEGORIES.some((cat) => product.category === cat.value)
          })
      )
    )
  }

  searchProducts(searchTerm: string = ''): Observable<ProductInterface[]> {
    let apiUrl = 'https://dummyjson.com/products'

    if (searchTerm) {
      apiUrl = `${apiUrl}/search?q=${searchTerm}`
    }

    return this.http.get<{ products: any[] }>(apiUrl).pipe(
      map((response) =>
        response.products
          .map((product) => ({
            id: product.id,
            name: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            category: product.category,
          }))
          .filter((product) => {
            return CATEGORIES.some((cat) => product.category === cat.value)
          })
      )
    )
  }

  getProductById(id: number): Observable<ProductDetailsInterface> {
    const apiUrl = `https://dummyjson.com/products/${id}`
    return this.http.get<any>(apiUrl).pipe(
      map((product) => ({
        id: product.id,
        name: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        images: product.images,
        category: product.category,
      }))
    )
  }

  getProductsByCategory(category: string): Observable<ProductInterface[]> {
    const apiUrl = `https://dummyjson.com/products/category/${category}`

    return this.http.get<{ products: any[] }>(apiUrl).pipe(
      map((response) =>
        response.products.map((product) => ({
          id: product.id,
          name: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
          category: product.category,
        }))
      )
    )
  }
}
