import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileUploadDialogComponent } from './file-upload-dialog.component';

describe('FileUploadDialogComponent', () => {
  let component: FileUploadDialogComponent;
  let fixture: ComponentFixture<FileUploadDialogComponent>;
  let dialogRef: jest.Mocked<MatDialogRef<FileUploadDialogComponent>>;

  beforeEach(async () => {
    const dialogRefMock = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [FileUploadDialogComponent],
      imports: [MatIconModule, MatTooltipModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Upload File' } }
      ]
    }).compileComponents();

    dialogRef = TestBed.inject(MatDialogRef) as jest.Mocked<MatDialogRef<FileUploadDialogComponent>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file selection with valid file', () => {
    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const event = { target: { files: [file] } };
    
    component.onFileSelected(event);
    expect(component.selectedFile).toBe(file);
  });

  it('should reject invalid file types', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });
    const event = { target: { files: [file] } };
    
    component.onFileSelected(event);
    expect(component.selectedFile).toBeNull();
  });

  it('should handle drag over event', () => {
    const event = new DragEvent('dragover');
    jest.spyOn(event, 'preventDefault');
    jest.spyOn(event, 'stopPropagation');
    
    component.onDragOver(event);
    
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.isDragOver).toBe(true);
  });

  it('should handle drag leave event', () => {
    const event = new DragEvent('dragleave');
    jest.spyOn(event, 'preventDefault');
    jest.spyOn(event, 'stopPropagation');
    
    component.onDragLeave(event);
    
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.isDragOver).toBe(false);
  });

  it('should handle file drop with valid file', () => {
    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const event = new DragEvent('drop');
    Object.defineProperty(event, 'dataTransfer', {
      value: { files: [file] }
    });
    
    component.onDrop(event);
    expect(component.selectedFile).toBe(file);
  });

  it('should handle file drop with invalid file', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });
    const event = new DragEvent('drop');
    Object.defineProperty(event, 'dataTransfer', {
      value: { files: [file] }
    });
    
    component.onDrop(event);
    expect(component.selectedFile).toBeNull();
  });

  it('should close dialog on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog with file on upload', () => {
    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    component.selectedFile = file;
    
    component.onUpload();
    expect(dialogRef.close).toHaveBeenCalledWith(file);
  });

  it('should remove selected file', () => {
    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    component.selectedFile = file;
    
    component.removeFile();
    expect(component.selectedFile).toBeNull();
  });

  it('should format file size correctly', () => {
    expect(component.formatFileSize(0)).toBe('0 Bytes');
    expect(component.formatFileSize(1024)).toBe('1kb');
    expect(component.formatFileSize(1048576)).toBe('1Mb');
    expect(component.formatFileSize(1073741824)).toBe('1Gb');
  });

  it('should format date correctly', () => {
    const timestamp = new Date('2025-01-15T12:00:00').getTime();
    const formattedDate = component.formatDate(timestamp);
    expect(formattedDate).toMatch(/01\/15\/2025/);
  });
});