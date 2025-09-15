import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

  checkUser(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${email}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return new Observable((observer) => observer.next(null));
        }
        console.error('Error verificando usuario:', error);
        return throwError(() => error);
      })
    );
  }

  createUser(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email }).pipe(
      catchError((error) => {
        console.error('Error creando usuario:', error);
        return throwError(() => error);
      })
    );
  }
}
