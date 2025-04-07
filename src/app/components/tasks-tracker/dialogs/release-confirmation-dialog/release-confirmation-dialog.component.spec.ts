import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ReleaseConfirmationDialogComponent } from './release-confirmation-dialog.component';

describe('ReleaseConfirmationDialogComponent', () => {
  let component: ReleaseConfirmationDialogComponent;
  let fixture: ComponentFixture<ReleaseConfirmationDialogComponent>;
  let dialogRef: jest.Mocked<MatDialogRef<ReleaseConfirmationDialogComponent>>;

  beforeEach(async () => {
    const dialogRefMock = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ReleaseConfirmationDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    }).compileComponents();

    dialogRef = TestBed.inject(MatDialogRef) as jest.Mocked<MatDialogRef<ReleaseConfirmationDialogComponent>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with false on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close dialog with true on confirm', () => {
    component.onConfirm();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});