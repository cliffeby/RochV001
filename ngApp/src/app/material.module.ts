import { MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule, ErrorStateMatcher} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule
  ]
})
export class MaterialModule { }
