import { Component, OnInit, EventEmitter } from '@angular/core';
import { Scorecard } from '../../models/scorecard';

@Component({
  selector: 'scorecard-list',
  templateUrl: 'scorecard-list.component.html',
  styleUrls: ['scorecard-list.component.css'],
  inputs: ['scorecards'],
  outputs: ['SelectScorecard', 'CopyScorecardEvent', 'AddScorecardEvent']
})
export class ScorecardListComponent implements OnInit {
  public SelectScorecard = new EventEmitter();
  public CopyScorecardEvent = new EventEmitter();
  public AddScorecardEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(scard: Scorecard) {
    this.SelectScorecard.emit(scard);
  }
  onCopyAddScorecard(scard: Scorecard){
    this.CopyScorecardEvent.emit(scard);
  }
  addScorecard() {
    this.AddScorecardEvent.emit();
  }
}
