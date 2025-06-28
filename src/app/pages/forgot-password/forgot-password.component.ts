import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  loading = false;
  message: string | null = null;
  errorMsg: string | null = null;
  emailSent = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.message = null;
    this.errorMsg = null;

    if (this.forgotPasswordForm.valid) {
      this.loading = true;
      const { email } = this.forgotPasswordForm.value;

      this.authService.forgotPassword(email).subscribe({
        next: (response) => {
          this.loading = false;
          this.emailSent = true;
          this.message = response.message || 'Password reset email sent successfully!';
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err?.error?.message || 'Failed to send reset email. Please try again.';
        }
      });
    }
  }

  resendEmail() {
    if (this.forgotPasswordForm.valid) {
      this.onSubmit();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}