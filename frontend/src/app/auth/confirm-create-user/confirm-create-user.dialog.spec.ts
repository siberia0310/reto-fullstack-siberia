import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmCreateUserDialog } from './confirm-create-user.dialog';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmCreateUserDialog', () => {
  let component: ConfirmCreateUserDialog;
  let fixture: ComponentFixture<ConfirmCreateUserDialog>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmCreateUserDialog>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ConfirmCreateUserDialog],
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { email: 'ejemplo@correo.com' } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmCreateUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with true when confirm is called', () => {
    component.onConfirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with false when cancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });
});
