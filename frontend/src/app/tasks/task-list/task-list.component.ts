import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks = [
    { id: 1, title: 'Primera tarea', completed: false },
    { id: 2, title: 'Segunda tarea', completed: true },
    { id: 3, title: 'Tercera tarea', completed: false }
  ];

  toggleTask(task: any) {
    task.completed = !task.completed;
  }

  deleteTask(task: any) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }
}
