import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import * as ProductsActions from '../actions/products.actions'
import { catchError, map, mergeMap, of } from 'rxjs'
import { ProductsService } from '../../services/products.service'

@Injectable({ providedIn: 'root' })
export class ProductsEffects {
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      mergeMap(() => {
        return this.productsService.getProducts().pipe(
          map((products) => ProductsActions.getProductsSuccess({ products })),
          catchError((error) =>
            of(ProductsActions.getProductsFailure({ error: error.message }))
          )
        )
      })
    )
  )

  getProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProductById),
      mergeMap((action) =>
        this.productsService.getProductById(action.id).pipe(
          map((product) => ProductsActions.getProductByIdSuccess({ product })),
          catchError((error) =>
            of(ProductsActions.getProductByIdFailure({ error: error.message }))
          )
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
