import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
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
      declarations: [ReleaseConfirmationDialogComponent],
      imports: [MatButtonModule],
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

  it('should render confirmation message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.dialog-content p').textContent).toContain('Please confirm you uploaded');
  });

  it('should have cancel and confirm buttons', () => {
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(3); // Including close button
    expect(buttons[1].textContent).toContain('CANCEL');
    expect(buttons[2].textContent).toContain('CONFIRM');
  });
});