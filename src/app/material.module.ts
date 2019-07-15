import { NgModule } from '@angular/core';
import { 
  MatButtonModule, 
  MatInputModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatTooltipModule,
  MatChipsModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatProgressBarModule,
  MatDividerModule,
  MatGridListModule,
  MatStepperModule
  
} from '@angular/material';

import {
  DragDropModule
} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    DragDropModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDividerModule,
    MatGridListModule,
    MatStepperModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSlideToggleModule,
    DragDropModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDividerModule,
    MatGridListModule,
    MatStepperModule
  ]
}) 
export class MaterialModule { }