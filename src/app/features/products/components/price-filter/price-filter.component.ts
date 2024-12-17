import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subject, takeUntil, debounceTime, filter } from 'rxjs'

import { ProductsFeatureStateInterface } from '../../types/productsFeatureState.interface'
import * as FiltersActions from '../../store/actions/filters.actions'
import { priceRangeSelector } from 'features/products/store/selectors/filters.selectors'

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.scss',
})
export class PriceFilterComponent implements OnInit, OnDestroy {
  readonly MIN_PRICE = 0
  readonly MAX_PRICE = 250
  readonly STEP_SIZE = 10
  isLoaded = false

  isFilterActive: boolean = false
  priceRangeForm: FormGroup
  destroy$ = new Subject<void>()
  tempSliderValues = { min: this.MIN_PRICE, max: this.MAX_PRICE }
  currentValues = { min: this.MIN_PRICE, max: this.MAX_PRICE }

  constructor(
    private store: Store<ProductsFeatureStateInterface>,
    private fb: FormBuilder
  ) {
    this.priceRangeForm = this.fb.group({
      minPrice: [
        this.MIN_PRICE,
        [
          Validators.required,
          this.minLessThanMaxValidator(),
          Validators.min(this.MIN_PRICE),
        ],
      ],
      maxPrice: [
        this.MAX_PRICE,
        [Validators.required, Validators.max(this.MAX_PRICE)],
      ],
    })
  }

  ngOnInit(): void {
    this.initializePriceRangeSubscription()
    this.initializeFormValueChanges()

    setTimeout(() => {
      this.isLoaded = true
    }, 150)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  initializePriceRangeSubscription(): void {
    this.store
      .select(priceRangeSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((priceRange) => {
        this.currentValues = priceRange
        this.tempSliderValues = { min: priceRange.min, max: priceRange.max }
        this.priceRangeForm.patchValue(
          {
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
          },
          { emitEvent: false }
        )
      })
  }

  initializeFormValueChanges(): void {
    this.priceRangeForm.valueChanges
      .pipe(
        debounceTime(500),
        filter(() => this.priceRangeForm.valid),
        filter(() => {
          const { minPrice, maxPrice } = this.priceRangeForm.value
          return (
            minPrice !== this.currentValues.min ||
            maxPrice !== this.currentValues.max
          )
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const { minPrice, maxPrice } = this.priceRangeForm.value
        this.store.dispatch(
          FiltersActions.updatePriceRange({
            priceRange: { min: minPrice, max: maxPrice },
          })
        )
      })
  }

  onSliderMinDragEnd(): void {
    const newValue = {
      min: this.tempSliderValues.min,
      max: this.priceRangeForm.get('maxPrice')?.value ?? this.MAX_PRICE,
    }

    if (newValue.min !== this.currentValues.min) {
      this.updatePriceRange(newValue, 'minPrice')
    }
  }

  onSliderMaxDragEnd(): void {
    const newValue = {
      min: this.priceRangeForm.get('minPrice')?.value ?? this.MIN_PRICE,
      max: this.tempSliderValues.max,
    }

    if (newValue.max !== this.currentValues.max) {
      this.updatePriceRange(newValue, 'maxPrice')
    }
  }

  updatePriceRange(
    newValue: { min: number; max: number },
    controlName: string
  ): void {
    if (controlName === 'minPrice') {
      this.priceRangeForm.patchValue({ minPrice: newValue.min })
    } else {
      this.priceRangeForm.patchValue({ maxPrice: newValue.max })
    }
  }

  minLessThanMaxValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null
      }

      const minPrice = control.value
      const maxPrice = control.parent.get('maxPrice')?.value

      if (minPrice > maxPrice) {
        return { minGreaterThanMax: true }
      }

      return null
    }
  }

  onFilterFocus(): void {
    this.isFilterActive = true
  }

  onFilterBlur(): void {
    this.isFilterActive = false
  }
}
