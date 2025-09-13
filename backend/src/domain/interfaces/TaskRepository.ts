import { Task } from "../entities/Task";

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  create(task: Omit<Task, "id">): Promise<Task>;
  update(id: string, updates: Partial<Omit<Task, "id">>): Promise<Task>;
  delete(id: string): Promise<void>;
}
