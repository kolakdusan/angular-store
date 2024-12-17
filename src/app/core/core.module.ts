import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { HeaderComponent } from './components/header/header.component'
import { AboutComponent } from './components/about/about.component'

@NgModule({
  declarations: [HeaderComponent, AboutComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
