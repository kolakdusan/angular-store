import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedRoutingModule } from './shared-routing.module'
import { ButtonComponent } from './components/button/button.component'
import { SearchBarComponent } from './components/search-bar/search-bar.component'
import { BadgeComponent } from './components/badge/badge.component'
import { ErrorPageComponent } from './pages/error-page/error-page.component'

@NgModule({
  declarations: [
    ButtonComponent,
    SearchBarComponent,
    BadgeComponent,
    ErrorPageComponent,
  ],
  imports: [CommonModule, SharedRoutingModule],
})
export class SharedModule {}
