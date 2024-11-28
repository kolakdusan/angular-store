import { Component } from '@angular/core'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrl: './product-sidebar.component.scss',
})
export class ProductSidebarComponent {
  faLayerGroup = faLayerGroup

  selectedCategory: string = 'All'

  setCategory(category: string): void {
    this.selectedCategory = category
  }
}
