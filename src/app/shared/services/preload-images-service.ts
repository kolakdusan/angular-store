import { Injectable } from '@angular/core'
import { Observable, forkJoin, of, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ImagePreloaderService {
  preloadImages<T>(items: T[], imageField: keyof T): Observable<T[]> {
    if (!items || items.length === 0) {
      return of(items)
    }
    const imageLoaders = items.map(
      (item) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          const imageUrl = item[imageField] as unknown as string
          img.src = imageUrl
          img.onload = () => resolve()
          img.onerror = () => resolve()
        })
    )
    return forkJoin(imageLoaders).pipe(switchMap(() => of(items)))
  }
}
