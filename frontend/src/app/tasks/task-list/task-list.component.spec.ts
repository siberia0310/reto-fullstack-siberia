import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TaskService } from '../task.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

// Mock TaskService
const mockTaskService = {
  getTasks: jasmine.createSpy('getTasks').and.returnValue(of([])),
  addTask: jasmine.createSpy('addTask').and.returnValue(of({})),
  updateTask: jasmine.createSpy('updateTask').and.returnValue(of({})),
  deleteTask: jasmine.createSpy('deleteTask').and.returnValue(of({}))
};

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.taskForm.valid).toBeFalse();
  });

  it('should call addTask when form is valid and editingTaskId is null', fakeAsync(() => {
    component.taskForm.setValue({ title: 'Nueva tarea', description: 'Descripción' });
    component.editingTaskId = null;
    component.onSubmit();

    tick();
    expect(mockTaskService.addTask).toHaveBeenCalled();
  }));
});
