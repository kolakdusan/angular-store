import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'

@Injectable({ providedIn: 'root' })
export class FiltersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<ProductsFeatureStateInterface>
  ) {}
}
