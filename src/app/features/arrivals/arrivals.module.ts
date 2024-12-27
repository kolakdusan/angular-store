import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ArrivalsRoutingModule } from './arrivals-routing.module'
import { ArrivalsPageComponent } from './pages/arrivals-page/arrivals-page.component'
import { SharedModule } from 'shared/shared.module'

@NgModule({
  declarations: [ArrivalsPageComponent],
  imports: [CommonModule, ArrivalsRoutingModule, SharedModule],
})
export class ArrivalsModule {}
