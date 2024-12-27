import { Component } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  onAddToCartSuccess({
    message,
    isStockError,
  }: {
    message: string
    isStockError: boolean
  }): void {
    const snackBarRef = this.snackBar.open(
      message,
      isStockError ? '' : 'Go to Cart',
      {
        duration: 3000,
        panelClass: [isStockError ? 'snack-bar-error' : 'snack-bar-success'],
      }
    )

    snackBarRef.onAction().subscribe(() => {
      isStockError ? console.log('Retry') : this.router.navigate(['/cart'])
    })
  }
}
