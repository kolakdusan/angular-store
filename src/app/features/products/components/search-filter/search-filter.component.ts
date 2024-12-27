import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subject, takeUntil, debounceTime } from 'rxjs'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'
import * as FiltersActions from '../../store/actions/filters.actions'
import { searchTermSelector } from 'features/products/store/selectors/filters.selectors'

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  faSearch = faSearch
  searchForm: FormGroup
  destroy$ = new Subject<void>()
  debounceTimeMs = 500
  maxSearchLength = 20

  constructor(
    private store: Store<ProductsFeatureStateInterface>,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['', [this.createSearchValidator()]],
    })
  }

  ngOnInit(): void {
    this.store
      .select(searchTermSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.searchForm.patchValue({ searchTerm }, { emitEvent: false })
      })

    this.searchForm
      .get('searchTerm')
      ?.valueChanges.pipe(
        takeUntil(this.destroy$),
        debounceTime(this.debounceTimeMs)
      )
      .subscribe((value) => {
        if (this.searchForm.valid) {
          const sanitizedValue = this.sanitizeInput(value)
          this.store.dispatch(
            FiltersActions.updateSearchTerm({ searchTerm: sanitizedValue })
          )
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  sanitizeInput(input: string): string {
    return input.trim().replace(/\s+/g, ' ')
  }

  createSearchValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || ''

      const hasInvalidChars = /[^a-zA-Z0-9\s]/.test(value)
      const isTooLong = value.length > this.maxSearchLength

      if (hasInvalidChars || isTooLong) {
        return {
          ...(hasInvalidChars && { invalidChars: true }),
          ...(isTooLong && { maxlength: true }),
        }
      }

      return null
    }
  }
}
