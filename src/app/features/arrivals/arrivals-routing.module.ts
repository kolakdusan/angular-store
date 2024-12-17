import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ArrivalsPageComponent } from './pages/arrivals-page/arrivals-page.component'

const routes: Routes = [
  {
    path: '',
    component: ArrivalsPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArrivalsRoutingModule {}
