import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule ],
  exports: [MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule ],
})
export class MaterialModule { }