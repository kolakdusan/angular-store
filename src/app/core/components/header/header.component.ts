import { Component } from '@angular/core'
import {
  faArrowRightFromBracket,
  faUserPlus,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

import { faGithub } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faArrowRightFromBracket = faArrowRightFromBracket
  faUserPlus = faUserPlus
  faGithub = faGithub
  faBars = faBars
  faXmark = faXmark

  isSidebarOpen: boolean = false

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }
}
