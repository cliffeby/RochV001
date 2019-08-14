import {
  MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTableDataSource,
  MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatListModule, MatGridListModule, MatSortModule} from '@angular/material';
import { MatTableModule } from '@angular/material/table'
import { NgModule } from '@angular/core';

const MaterialComponents = [MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule,
  MatDatepickerModule, MatNativeDateModule, MatTableModule, MatSelectModule, MatListModule, MatGridListModule, MatSortModule
]

@NgModule({

  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
