import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { faSliders, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import * as FiltersActions from '../../store/actions/filters.actions'
import { AppStateInterface } from '../../types/appState.interface'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  faSliders = faSliders
  faAngleDown = faAngleDown

  isHidden: boolean = true

  constructor(private store: Store<AppStateInterface>) {}

  toggleFilters(): void {
    this.isHidden = !this.isHidden
  }

  onClearFilters(): void {
    this.store.dispatch(FiltersActions.resetFilters())
  }
}
