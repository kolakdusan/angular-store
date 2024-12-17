import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../auth/services/auth.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  checkoutForm: FormGroup
  submitted = false

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.checkoutForm = this.fb.group({
      name: [this.authService.getFullName() || '', Validators.required],
      address: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value)
    }
  }
}
