import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../auth.service';
import { ConfirmCreateUserDialog } from '../confirm-create-user/confirm-create-user.dialog';

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { environment } from '../../../environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
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

    initializeApp(environment.firebaseConfig);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.emailInput.nativeElement.focus(), 0);
  }

  async loginToFirebaseAndStoreToken(): Promise<void> {
    const auth = getAuth();

    try {
      const userCredential = await signInAnonymously(auth);
      const idToken = await userCredential.user.getIdToken();

      localStorage.setItem('authToken', idToken);
    } catch (error) {
      console.error('Firebase auth error:', error);
      this.snackBar.open('Error al autenticar con Firebase', 'Cerrar', { duration: 3000 });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.value.email;

      this.authService.checkUser(email).subscribe({
        next: (user) => {
          if (user) {
            this.finalizeLogin(user);
          } else {
            this.dialog
              .open(ConfirmCreateUserDialog, { data: { email } })
              .afterClosed()
              .subscribe((result) => {
                if (result === true) {
                  this.authService.createUser(email).subscribe({
                    next: (newUser) => this.finalizeLogin(newUser),
                    error: (err) => {
                      console.error('Error creando usuario:', err);
                      this.snackBar.open('Error al crear usuario', 'Cerrar', { duration: 3000 });
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

  private async finalizeLogin(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    await this.loginToFirebaseAndStoreToken();
    this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
    this.router.navigate(['/tasks']);
    this.isLoading = false;
  }
}
