import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
      imports: [FileUploadDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Upload' } }
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

  it('should handle file selection', () => {
    const mockFile = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const event = { target: { files: [mockFile] } };
    
    component.onFileSelected(event);
    expect(component.selectedFile).toBe(mockFile);
  });

  it('should reject invalid file types', () => {
    const mockFile = new File([''], 'test.pdf', { type: 'application/pdf' });
    const event = { target: { files: [mockFile] } };
    
    component.onFileSelected(event);
    expect(component.selectedFile).toBeNull();
  });

  it('should handle drag over', () => {
    const event = new DragEvent('dragover');
    jest.spyOn(event, 'preventDefault');
    jest.spyOn(event, 'stopPropagation');
    
    component.onDragOver(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.isDragOver).toBe(true);
  });

  it('should handle drag leave', () => {
    const event = new DragEvent('dragleave');
    jest.spyOn(event, 'preventDefault');
    jest.spyOn(event, 'stopPropagation');
    
    component.onDragLeave(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.isDragOver).toBe(false);
  });

  it('should format file size correctly', () => {
    expect(component.formatFileSize(0)).toBe('0 Bytes');
    expect(component.formatFileSize(1024)).toBe('1kb');
    expect(component.formatFileSize(1048576)).toBe('1Mb');
  });

  it('should format date correctly', () => {
    const timestamp = new Date('2025-01-15T12:00:00').getTime();
    const formattedDate = component.formatDate(timestamp);
    expect(formattedDate).toMatch(/01\/15\/2025/);
  });

  it('should close dialog on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog with file on upload', () => {
    const mockFile = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    component.selectedFile = mockFile;
    
    component.onUpload();
    expect(dialogRef.close).toHaveBeenCalledWith(mockFile);
  });

  it('should remove selected file', () => {
    const mockFile = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    component.selectedFile = mockFile;
    
    component.removeFile();
    expect(component.selectedFile).toBeNull();
  });
});