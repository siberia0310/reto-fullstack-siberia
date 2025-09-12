import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;

  // Variables de UI (estado temporal)
  editingTaskId: string | null = null;
  editTitle: string = '';
  editDescription: string = '';

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        completed: false,
        createdAt: new Date()
      };

      this.taskService.addTask(newTask).subscribe(() => {
        this.taskForm.reset();
        this.loadTasks();
      });
    }
  }

  startEdit(task: Task): void {
    this.editingTaskId = task.id;
    this.editTitle = task.title;
    this.editDescription = task.description || '';
  }

  saveEdit(task: Task): void {
    const updatedTask: Task = {
      ...task,
      title: this.editTitle,
      description: this.editDescription
    };
  
    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        this.editingTaskId = null;
        this.loadTasks();
      },
      error: (err) => alert('No se pudo actualizar la tarea: ' + err.message)
    });
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editTitle = '';
    this.editDescription = '';
  }

  toggleTask(task: Task): void {
    const updatedTask: Task = {
      ...task,
      completed: !task.completed
    };
  
    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => this.loadTasks(),
      error: (err) => alert('No se pudo actualizar la tarea: ' + err.message)
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}
