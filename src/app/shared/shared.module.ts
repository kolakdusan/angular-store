import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

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
  imports: [CommonModule, SharedRoutingModule, FormsModule, FontAwesomeModule],
  exports: [SearchBarComponent, BadgeComponent, ButtonComponent],
})
export class SharedModule {}
