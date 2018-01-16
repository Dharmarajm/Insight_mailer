import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule ],
  exports: [MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule ],
})
export class MaterialModule { }