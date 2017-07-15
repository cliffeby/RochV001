import { Component, OnInit, EventEmitter } from '@angular/core';
import { Scorecard } from '../../models/scorecard';

@Component({
  selector: 'scorecard-list',
  templateUrl: 'scorecard-list.component.html',
  styleUrls: ['scorecard-list.component.css'],
  inputs: ['scorecards'],
  outputs: ['SelectScorecard']
})
export class ScorecardListComponent implements OnInit {
  public SelectScorecard = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(vid: Scorecard) {
    this.SelectScorecard.emit(vid);
  }

}
