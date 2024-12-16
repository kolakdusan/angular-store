import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subject, takeUntil } from 'rxjs'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

import { CATEGORIES } from '../../../../shared/data/constants'
import { AppStateInterface } from '../../types/appState.interface'
import * as FiltersActions from '../../store/actions/filters.actions'
import { selectedCategorySelector } from 'features/products/store/selectors/filters.selectors'

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrl: './categories-filter.component.scss',
})
export class CategoriesFilterComponent implements OnInit, OnDestroy {
  faLayerGroup = faLayerGroup
  categories = CATEGORIES
  isFilterActive = false
  categoriesForm: FormGroup
  destroy$ = new Subject<void>()
  categoryPattern = new RegExp(
    `^(All|${CATEGORIES.map((category) => category.value).join('|')})$`
  )

  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder
  ) {
    this.categoriesForm = this.fb.group({
      category: ['All', [Validators.required, this.categoryValidator()]],
    })
  }

  ngOnInit(): void {
    this.store
      .select(selectedCategorySelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        const value = category || 'All'
        this.categoriesForm.patchValue(
          { category: value },
          { emitEvent: false }
        )
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  setCategory(category: string): void {
    this.categoriesForm.patchValue({ category })

    if (this.categoriesForm.valid) {
      if (category === 'All') {
        this.store.dispatch(FiltersActions.updateCategory({ category: '' }))
      } else {
        this.store.dispatch(FiltersActions.updateCategory({ category }))
      }
    }
  }

  categoryValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = this.categoryPattern.test(control.value)
      return valid ? null : { invalidCategory: true }
    }
  }

  onFilterFocus(): void {
    this.isFilterActive = true
  }

  onFilterBlur(): void {
    this.isFilterActive = false
  }
}
