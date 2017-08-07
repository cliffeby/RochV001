import { Component, OnInit, EventEmitter } from '@angular/core';
import { Scorecard } from '../../models/scorecard';

@Component({
  selector: 'scorecard-list',
  templateUrl: 'scorecard-list.component.html',
  styleUrls: ['scorecard-list.component.css'],
  inputs: ['scorecards'],
  outputs: ['SelectScorecard', 'CopyScorecardEvent']
})
export class ScorecardListComponent implements OnInit {
  public SelectScorecard = new EventEmitter();
  public CopyScorecardEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(scard: Scorecard) {
    this.SelectScorecard.emit(scard);
  }
  onCopyAddScorecard(scard: Scorecard){
    console.log('Emited',scard);
    this.CopyScorecardEvent.emit(scard);
  }

}
