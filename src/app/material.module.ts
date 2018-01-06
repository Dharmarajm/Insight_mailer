import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,MatTableDataSource, MatSort, MatInputModule, MatCardModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatCardModule, MatDialogModule ],
  exports: [MatButtonModule, MatInputModule, MatCardModule, MatDialogModule ],
})
export class MaterialModule { }