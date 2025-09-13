import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;

  // Variables de UI (estado temporal)
  editingTaskId: string | null = null;
  editTitle: string = '';
  editDescription: string = '';
  displayedColumns: string[] = [
    'completed',
    'title',
    'description',
    'createdAt',
    'status',
    'actions',
  ];

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
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
  onSubmit(): void {
    if (this.editingTaskId) {
      this.saveEdit();
    } else {
      this.addTask();
    }
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        completed: false,
        createdAt: new Date(),
      };

      this.taskService.addTask(newTask).subscribe(() => {
        this.taskForm.reset();
        this.loadTasks();
      });
    }
  }

  startEdit(task: Task): void {
    this.editingTaskId = task.id;

    // llenamos el formulario con los valores actuales
    this.taskForm.patchValue({
      title: task.title,
      description: task.description || '',
    });
  }

  saveEdit(): void {
    if (this.taskForm.valid && this.editingTaskId) {
      const updatedTask = {
        ...this.tasks.find((t) => t.id === this.editingTaskId),
        ...this.taskForm.value,
      };

      this.taskService.updateTask(this.editingTaskId, updatedTask).subscribe(() => {
        this.editingTaskId = null;
        this.taskForm.reset();
        this.loadTasks();
      });
    }
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.taskForm.reset();
  }

  toggleTask(task: Task): void {
    const updatedTask: Task = {
      ...task,
      completed: !task.completed,
    };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => this.loadTasks(),
      error: (err) => alert('No se pudo actualizar la tarea: ' + err.message),
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}
