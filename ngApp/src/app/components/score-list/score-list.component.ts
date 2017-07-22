import { Component, OnInit, EventEmitter } from '@angular/core';
import { Score } from '../../models/score';

@Component({
  selector: 'score-list',
  templateUrl: 'score-list.component.html',
  styleUrls: ['score-list.component.css'],
  inputs: ['scores'],
  outputs: ['SelectScore']
})
export class ScoreListComponent implements OnInit {
  public SelectScore = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(scr: Score) {
    this.SelectScore.emit(scr);
  }

}
