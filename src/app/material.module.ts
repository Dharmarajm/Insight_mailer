import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule, MatListModule ],
  exports: [MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatSidenavModule, MatListModule ],
})
export class MaterialModule { }