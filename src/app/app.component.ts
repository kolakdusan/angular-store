import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { selectCartItemsCount } from './features/cart/store/selectors/cart.selectors'
import { NavigationEnd, Router } from '@angular/router'

import { AuthService } from './features/auth/services/auth.service'
import * as CartActions from './features/cart/store/actions/cart.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cartCount$: Observable<number>
  showHeader$: Observable<boolean>

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {
    this.cartCount$ = this.store.select(selectCartItemsCount)
    this.showHeader$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(
        (event) =>
          !event.url.includes('/login') && !event.url.includes('/about')
      )
    )
  }

  handleLogout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart())
  }
}
