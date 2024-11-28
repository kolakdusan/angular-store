import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products = [
    {
      id: 1,
      name: 'T-Shirt',
      description: 'A stylish t-shirt',
      price: 1200,
      image: 'assets/tshirt.webp',
      category: 'Clothes',
    },
    {
      id: 2,
      name: 'Jeans',
      description: 'Comfortable jeans',
      price: 1500,
      image: 'assets/tshirt.webp',
      category: 'Clothes',
    },
    {
      id: 3,
      name: 'Jacket',
      description: 'Warm jacket for winter',
      price: 2000,
      image: 'assets/tshirt.webp',
      category: 'Clothes',
    },
    {
      id: 4,
      name: 'Shoes',
      description: 'Stylish sneakers',
      price: 1800,
      image: 'assets/tshirt.webp',
      category: 'Footwear',
    },
    {
      id: 5,
      name: 'Hat',
      description: 'Fashionable hat',
      price: 800,
      image: 'assets/tshirt.webp',
      category: 'Accessories',
    },
    {
      id: 6,
      name: 'Bag',
      description: 'Elegant bag for daily use',
      price: 2200,
      image: 'assets/tshirt.webp',
      category: 'Accessories',
    },
  ]

  constructor(private router: Router) {}

  onProductClick(productId: number): void {
    console.log('Product ID:', productId)
    this.router.navigate(['/products', productId])
  }
}
