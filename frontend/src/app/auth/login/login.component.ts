import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCreateUserDialog } from '../confirm-create-user/confirm-create-user.dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  isLoading = false;

  @ViewChild('emailInput') emailInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.emailInput.nativeElement.focus(), 0);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.value.email;

      this.authService.checkUser(email).subscribe({
        next: (user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/tasks']);
            this.isLoading = false;
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
                      this.snackBar.open('Usuario creado correctamente', 'Cerrar', {
                        duration: 3000,
                      });
                      this.router.navigate(['/tasks']);
                    },
                    error: (err) => {
                      console.error('Error creando usuario:', err);
                      this.snackBar.open('Error al crear usuario', 'Cerrar', { duration: 3000 });
                    },
                    complete: () => {
                      this.isLoading = false;
                    },
                  });
                } else {
                  this.isLoading = false;
                }
              });
          }
        },
        error: (err) => {
          console.error('Error verificando usuario:', err);
          this.snackBar.open('Error de conexión', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        },
      });
    }
  }
}
