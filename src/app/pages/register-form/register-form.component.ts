import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  loading = false;
  errorMsg: string | null = null;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    this.errorMsg = null;

    if (this.registerForm.valid) {
      const { firstName, lastName, email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.errorMsg = 'Passwords do not match.';
        return;
      }

      this.loading = true;
      const username = `${firstName}`.toLowerCase();

      this.authService.register({ username, email, password }).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/login'], { state: { name: username } });
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err?.error?.message || 'Registration failed.';
        }
      });
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
