import { MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTableDataSource, ErrorStateMatcher,
  MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { MatTableModule } from '@angular/material/table'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTableModule, MatDatepickerModule,MatNativeDateModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTableModule, MatDatepickerModule, MatNativeDateModule
  ]
})
export class MaterialModule { }
