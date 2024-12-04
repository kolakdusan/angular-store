import { Pipe, PipeTransform } from '@angular/core'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Pipe({
  name: 'preload',
})
export class PreloadPipe implements PipeTransform {
  transform(products: any[]): Observable<any[]> {
    return from(this.preloadImages(products)).pipe(
      map(() => products) // Return the original array after preloading
    )
  }

  private preloadImages(products: any[]): Promise<void> {
    const imageLoaders = products.map(
      (product) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.src = product.image
          img.onload = () => resolve()
          img.onerror = () => resolve()
        })
    )
    return Promise.all(imageLoaders).then(() => undefined)
  }
}
