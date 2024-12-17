import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  letters = 'glass veil'.split('')

  loginForm: FormGroup
  submitted = false
  returnUrl: string | null = null

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })

    console.log(this.route.snapshot.queryParams)
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products'
  }

  onLogin() {
    this.submitted = true

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value

      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.snackBar.open('Successfully logged in', 'Clear', {
            duration: 3000,
            panelClass: ['snack-bar-success'],
          })
          this.router.navigate([this.returnUrl])
        },
        error: (error) => {
          this.snackBar.open(error.error?.message || 'Login failed', 'Clear', {
            duration: 3000,
            panelClass: ['snack-bar-error'],
          })
        },
      })
    }
  }

  onQuickExpiryLogin() {
    this.submitted = true

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value

      this.authService.quickExpiryLogin(username, password).subscribe({
        next: (response) => {
          this.snackBar.open('Successfully logged in', '', {
            duration: 3000,
            panelClass: ['snack-bar-success'],
          })
          this.router.navigate(['/products'])
        },
        error: (error) => {
          this.snackBar.open(error.error?.message || 'Login failed', '', {
            duration: 3000,
            panelClass: ['snack-bar-error'],
          })
        },
      })
    }
  }
}
