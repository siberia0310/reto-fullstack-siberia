import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:4000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener tareas:', error);
        alert('No se pudieron cargar las tareas');
        return throwError(() => error);
      })
    );
  }

  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError((error) => {
        console.error('Error al agregar tarea:', error);
        alert('No se pudo agregar la tarea');
        return throwError(() => error);
      })
    );
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(
      catchError((error) => {
        console.error('Error al actualizar tarea:', error);
        alert('No se pudo actualizar la tarea');
        return throwError(() => error);
      })
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar tarea:', error);
        alert('No se pudo eliminar la tarea');
        return throwError(() => error);
      })
    );
  }
}
