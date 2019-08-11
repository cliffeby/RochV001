import { MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule,
  MatDatepickerModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import { MatTableModule } from '@angular/material/table'
import { NgModule } from '@angular/core';

const MaterialComponents = [MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule,
  MatDatepickerModule, MatNativeDateModule, MatTableModule, MatSelectModule
]

@NgModule({

  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
