import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCreateUserDialog } from '../confirm-create-user/confirm-create-user.dialog';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;

      this.authService.checkUser(email).subscribe({
        next: (user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/tasks']);
          } else {
            this.dialog
              .open(ConfirmCreateUserDialog, {
                data: { email },
              })
              .afterClosed()
              .subscribe((result) => {
                if (result === true) {
                  this.authService.createUser(email).subscribe({
                    next: (newUser) => {
                      localStorage.setItem('user', JSON.stringify(newUser));
                      this.router.navigate(['/tasks']);
                    },
                    error: (err) => console.error('Error creando usuario:', err),
                  });
                }
              });
          }
        },
        error: (err) => console.error('Error verificando usuario:', err),
      });
    }
  }
}
