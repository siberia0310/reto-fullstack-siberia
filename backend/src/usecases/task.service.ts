import { Task } from "../domain/entities/Task";
import { TaskRepository } from "../domain/interfaces/TaskRepository";

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAll();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.taskRepository.getById(id);
  }

  async createTask(task: Omit<Task, "id">): Promise<Task> {
    return this.taskRepository.create(task);
  }

  async updateTask(
    id: string,
    updates: Partial<Omit<Task, "id">>
  ): Promise<Task> {
    return this.taskRepository.update(id, updates);
  }

  async deleteTask(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }
}
