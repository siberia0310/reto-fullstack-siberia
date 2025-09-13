import { Task } from "../domain/entities/Task";
import { TaskRepository } from "../domain/interfaces/TaskRepository";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getAll(): Promise<Task[]> {
    return this.taskRepository.getAll();
  }

  getById(id: string): Promise<Task | null> {
    return this.taskRepository.getById(id);
  }

  create(task: Omit<Task, "id">): Promise<Task> {
    return this.taskRepository.create(task);
  }

  update(id: string, updates: Partial<Omit<Task, "id">>): Promise<Task> {
    return this.taskRepository.update(id, updates);
  }

  delete(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }
}
