import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { SharedRoutingModule } from './shared-routing.module'
import { ButtonComponent } from './components/button/button.component'
import { SearchBarComponent } from './components/search-bar/search-bar.component'
import { BadgeComponent } from './components/badge/badge.component'
import { ErrorPageComponent } from './pages/error-page/error-page.component'
import { ShufflePipe } from './pipes/shuffle.pipe'
import { LoaderComponent } from './components/loader/loader.component'
import { PreloadPipe } from './pipes/preload.pipe'
import { FallbackComponent } from './components/fallback/fallback.component'
import { ReplaceHyphenPipe } from './replace-hyphen.pipe'

@NgModule({
  declarations: [
    ButtonComponent,
    SearchBarComponent,
    BadgeComponent,
    ErrorPageComponent,
    ShufflePipe,
    LoaderComponent,
    PreloadPipe,
    FallbackComponent,
    ReplaceHyphenPipe,
  ],
  imports: [CommonModule, SharedRoutingModule, FormsModule, FontAwesomeModule],
  exports: [
    SearchBarComponent,
    BadgeComponent,
    ButtonComponent,
    ShufflePipe,
    PreloadPipe,
    LoaderComponent,
    FallbackComponent,
    ReplaceHyphenPipe,
  ],
})
export class SharedModule {}
