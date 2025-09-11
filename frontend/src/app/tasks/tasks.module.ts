import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing-module';
import { TaskListComponent } from './task-list/task-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskListComponent 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
