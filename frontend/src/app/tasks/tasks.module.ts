import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing-module';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskListComponent 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,  
    TasksRoutingModule
  ]
})
export class TasksModule { }
