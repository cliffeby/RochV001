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
  data:any;
  yardsInputString = "1,2,3,4";
  title = 'Trying Again';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDetails().then((data: string) => this.data = data)
    this.onInitYardsString(this.yardsInputString);
  }
  onInitYardsString(yis:any) {
    let front9Yards: number = 0, back9Yards: number = 0;
    let yards: string[] = ('YARDS,' +yis).split(',');
    for (var i = 1; i < yards.length - 9; i++) {
      front9Yards = front9Yards + Number(yards[i]);
    }
    for (var j = 10; j < yards.length; j++) {
      back9Yards += Number(yards[j]);
    }
    let total18Yards = front9Yards + back9Yards;
    yards.splice(10, 0, String(front9Yards));
    yards.splice(20, 0, String(back9Yards));
    yards.splice(21, 0, String(total18Yards));
    return yards;
  }

}
