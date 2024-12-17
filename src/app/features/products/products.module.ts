import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from '../../shared/shared.module'
import { ProductsRoutingModule } from './products-routing.module'
import { ProductsPageComponent } from './pages/products-page/products-page.component'
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component'
import { ProductCardComponent } from './components/product-card/product-card.component'
import { ProductListComponent } from './components/product-list/product-list.component'
import { StoreModule } from '@ngrx/store'
import { reducers as paginationReducers } from './store/reducers/pagination.reducers'
import { reducers as filtersReducers } from './store/reducers/filters.reducers'
import { EffectsModule } from '@ngrx/effects'
import { FiltersComponent } from './components/filters/filters.component'
import { SearchFilterComponent } from './components/search-filter/search-filter.component'
import { CategoriesFilterComponent } from './components/categories-filter/categories-filter.component'
import { PaginationEffects } from './store/effects/pagination.effects'
import { FiltersEffects } from './store/effects/filters.effects'
import { RouterEffects } from './store/effects/router.effects'
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { SortFilterComponent } from './components/sort-filter/sort-filter.component'

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductDetailsPageComponent,
    ProductCardComponent,
    ProductListComponent,
    FiltersComponent,
    SearchFilterComponent,
    CategoriesFilterComponent,
    PriceFilterComponent,
    SortFilterComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('pagination', paginationReducers),
    StoreModule.forFeature('filters', filtersReducers),
    EffectsModule.forFeature([
      PaginationEffects,
      FiltersEffects,
      RouterEffects,
    ]),
  ],
  providers: [],
})
export class ProductsModule {}
