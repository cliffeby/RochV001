import { Component, OnInit, EventEmitter } from '@angular/core';
import { Match } from '../../models/match';

@Component({
  selector: 'match-list',
  templateUrl: 'match-list.component.html',
  styleUrls: ['match-list.component.css'],
  inputs: ['matches'],
  outputs: ['SelectMatch']
})
export class MatchListComponent implements OnInit {
  public SelectMatch = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(mtc: Match) {
    this.SelectMatch.emit(mtc);
  }

}
