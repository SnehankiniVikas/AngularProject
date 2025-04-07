import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { TasksTrackerComponent } from './components/tasks-tracker/tasks-tracker.component';
import { TasksComponent } from './components/tasks-tracker/tasks/tasks.component';
import { InspectionTrackerComponent } from './components/tasks-tracker/inspection-tracker/inspection-tracker.component';
import { InspectionsComponent } from './components/inspections/inspections.component';
import { OpenItemsComponent } from './components/open-items/open-items.component';
import { CapitalExpendituresComponent } from './components/capital-expenditures/capital-expenditures.component';
import { FileUploadDialogComponent } from './components/tasks-tracker/tasks/dialogs/file-upload-dialog/file-upload-dialog.component';
import { ReleaseConfirmationDialogComponent } from './components/tasks-tracker/tasks/dialogs/release-confirmation-dialog/release-confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InspectionTrackerComponent,
    TasksTrackerComponent,
    TasksComponent,
    InspectionsComponent,
    OpenItemsComponent,
    CapitalExpendituresComponent,
    FileUploadDialogComponent,
    ReleaseConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }