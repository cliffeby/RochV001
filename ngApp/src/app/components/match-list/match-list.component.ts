import { Component, OnInit, EventEmitter, NgModule } from '@angular/core';
import { Match } from '../../models/match';
import { CommonModule } from "@angular/common"

@Component({
  selector: 'match-list',
  templateUrl: 'match-list.component.html',
  styleUrls: ['match-list.component.css'],
  inputs: ['matches'],
  outputs: ['SelectMatch', 'AddMatchEvent']
})
@NgModule({
  imports: [CommonModule]
})
export class MatchListComponent implements OnInit {
  public SelectMatch = new EventEmitter();
  public AddMatchEvent = new EventEmitter();
  private queryString: string;
  constructor() { }

  ngOnInit() {
    this.queryString = "";
  }

  onSelectMatch(mtc: Match) {
    this.SelectMatch.emit(mtc);
  }

}
