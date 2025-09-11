import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/auth';

  constructor(private http: HttpClient) {}

  checkUser(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${email}`).pipe(
      catchError((error) => {
        console.error('Error al verificar usuario:', error);
        alert('No se pudo verificar el usuario');
        return throwError(() => error);
      })
    );
  }

  createUser(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email }).pipe(
      catchError((error) => {
        console.error('Error al crear usuario:', error);
        alert('No se pudo crear el usuario');
        return throwError(() => error);
      })
    );
  }
}
