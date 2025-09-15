import { Request, Response } from 'express';
import { TaskService } from '../usecases/task.service';
import { FirestoreTaskRepository } from '../infraestructure/repositories/FirestoreTaskRepository';
export class TaskController {
  private service: TaskService;

  constructor() {
    const repository = new FirestoreTaskRepository();
    this.service = new TaskService(repository);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await this.service.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({ message: 'Error getting tasks' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await this.service.getTaskById(req.params.id);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      console.error('Error getting task:', error);
      res.status(500).json({ message: 'Error getting task' });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const created = await this.service.createTask(req.body);
      res.status(201).json(created);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Error creating task' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updated = await this.service.updateTask(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Error updating task' });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Error deleting task' });
    }
  };
}
