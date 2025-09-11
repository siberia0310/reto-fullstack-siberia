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

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required]
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
      const newTask: Partial<Task> = {
        title: this.taskForm.value.title,
        completed: false
      };

      this.taskService.addTask(newTask).subscribe(() => {
        this.taskForm.reset();
        this.loadTasks(); 
      });
    }
  }

  toggleTask(task: Task): void {
    const updatedTask: Partial<Task> = { ...task, completed: !task.completed };
    this.taskService.updateTask(task.id, updatedTask).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(id: number): void { 
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}
