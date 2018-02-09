import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule, MatListModule, MatTableModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule, MatListModule, MatTableModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule ],
  exports: [MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule, MatListModule, MatTableModule,MatDividerModule, MatDatepickerModule, MatNativeDateModule ],
})
export class MaterialModule { }