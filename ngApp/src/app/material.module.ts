import { MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTableDataSource, ErrorStateMatcher} from '@angular/material';
import { MatTableModule } from '@angular/material/table'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTableModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTableModule
  ]
})
export class MaterialModule { }
