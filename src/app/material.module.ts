import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatCardModule, MatDialogModule, MatSortModule, MatTableDataSource, MatSort, MatSlideToggleModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatCardModule, MatDialogModule, MatSlideToggleModule ],
  exports: [MatButtonModule, MatInputModule, MatCardModule, MatDialogModule, MatSlideToggleModule ],
})
export class MaterialModule { }