import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subject, takeUntil } from 'rxjs'

import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'
import * as FiltersActions from '../../store/actions/filters.actions'
import { sortTypeSelector } from 'features/products/store/selectors/filters.selectors'

type SortType = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | ''

interface SortOption {
  value: SortType
  label: string
}

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrl: './sort-filter.component.scss',
})
export class SortFilterComponent implements OnInit, OnDestroy {
  sortForm: FormGroup
  destroy$ = new Subject<void>()
  isFilterActive = false

  readonly sortOptions: SortOption[] = [
    { value: '', label: 'Sort by...' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ]

  constructor(
    private store: Store<ProductsFeatureStateInterface>,
    private fb: FormBuilder
  ) {
    this.sortForm = this.fb.group({
      sortType: [''],
    })
  }

  ngOnInit(): void {
    this.store
      .select(sortTypeSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sortType) => {
        this.sortForm.patchValue({ sortType }, { emitEvent: false })
      })

    this.sortForm
      .get('sortType')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value: SortType) => {
        this.store.dispatch(FiltersActions.updateSort({ sortType: value }))
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onFilterFocus(): void {
    this.isFilterActive = true
  }

  onFilterBlur(): void {
    this.isFilterActive = false
  }
}
