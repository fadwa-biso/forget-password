import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  welcomeName: string | null = null;
  loginForm: FormGroup;
  loading = false;
  errorMsg: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (history.state && history.state.name) {
      this.welcomeName = history.state.name;
    }
  }

  showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

  onSubmit() {
    this.errorMsg = null;
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: (res) => {
          this.loading = false;
          // Store JWT token, username, and email (if available)
          this.authService.setSession(res.token, res.user.username, res.user.email || this.loginForm.value.email);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err?.error?.message || 'Login failed.';
        }
      });
    }
  }
}
