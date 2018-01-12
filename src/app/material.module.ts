import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule ],
  exports: [MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule ],
})
export class MaterialModule { }