import { TaskService } from './usecases/task.service';
import { AuthService } from './usecases/auth.service';
import { FirestoreTaskRepository } from './infraestructure/repositories/FirestoreTaskRepository';
import { FirestoreAuthRepository } from './infraestructure/repositories/FirestoreAuthRepository';

// Repositorios
const taskRepository = new FirestoreTaskRepository();
const authRepository = new FirestoreAuthRepository();

// Servicios
export const taskService = new TaskService(taskRepository);
export const authService = new AuthService(authRepository);

