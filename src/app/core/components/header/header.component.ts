import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  faArrowRightFromBracket,
  faUserPlus,
  faBars,
  faXmark,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Subscription, fromEvent, debounceTime } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() cartCount: number = 0
  @Output() logout = new EventEmitter<void>()

  faArrowRightFromBracket = faArrowRightFromBracket
  faUserPlus = faUserPlus
  faGithub = faGithub
  faBars = faBars
  faXmark = faXmark
  faShoppingCart = faShoppingCart

  isSidebarOpen: boolean = false
  private resizeSubscription = new Subscription()

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_user')
  }

  ngOnInit(): void {
    this.initializeResizeListener()
  }

  ngOnDestroy(): void {
    this.resizeSubscription?.unsubscribe()
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen

    if (this.isSidebarOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }

  onLogout(): void {
    this.logout.emit()
  }

  private initializeResizeListener(): void {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        if (this.isSidebarOpen) {
          this.isSidebarOpen = false
        }
      })
  }
}
