import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatSliderModule } from '@angular/material/slider'
import { MatInputModule } from '@angular/material/input'
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSelectModule } from '@angular/material/select'

import { SharedRoutingModule } from './shared-routing.module'
import { ButtonComponent } from './components/button/button.component'
import { SearchBarComponent } from './components/search-bar/search-bar.component'
import { BadgeComponent } from './components/badge/badge.component'
import { ErrorPageComponent } from './pages/error-page/error-page.component'
import { ShufflePipe } from './pipes/shuffle.pipe'
import { LoaderComponent } from './components/loader/loader.component'
import { FallbackComponent } from './components/fallback/fallback.component'
import { ReplaceHyphenPipe } from './pipes/replace-hyphen.pipe'
import { NoContentComponent } from './components/no-content/no-content.component'
import { PaginatorFormatService } from './services/paginator-format.service'
import { CustomPaginationDirective } from './directives/custom-pagination.directive'
import { SplineModelComponent } from './components/spline-model/spline-model.component'

@NgModule({
  declarations: [
    ButtonComponent,
    SearchBarComponent,
    BadgeComponent,
    ErrorPageComponent,
    ShufflePipe,
    LoaderComponent,
    FallbackComponent,
    ReplaceHyphenPipe,
    NoContentComponent,
    CustomPaginationDirective,
    SplineModelComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, FormsModule, FontAwesomeModule],
  exports: [
    SearchBarComponent,
    BadgeComponent,
    ButtonComponent,
    ShufflePipe,
    LoaderComponent,
    FallbackComponent,
    ReplaceHyphenPipe,
    NoContentComponent,
    MatSliderModule,
    MatInputModule,
    MatPaginatorModule,
    MatSnackBarModule,
    CustomPaginationDirective,
    MatSelectModule,
    SplineModelComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorFormatService }],
})
export class SharedModule {}
