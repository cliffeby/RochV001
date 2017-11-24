import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-aaa-sanity',
  templateUrl: './aaa-sanity.component.html',
  styleUrls: ['./aaa-sanity.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataService]
})
export class AAASanityComponent implements OnInit {
  data:string;
  title = 'Trying Again';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDetails().then((data: string) => this.data = data)
  }

}
