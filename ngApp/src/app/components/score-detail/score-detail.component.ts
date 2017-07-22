import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'score-detail',
  templateUrl: './score-detail.component.html',
  styleUrls: ['./score-detail.component.css'],
  inputs: ['score'],
  outputs: ['updateScoreEvent', 'deleteScoreEvent']
})
export class ScoreDetailComponent implements OnInit {
  score: any;

  private editTitle: boolean = false;
  private updateScoreEvent = new EventEmitter();
  private deleteScoreEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  updateScore() {
    this.updateScoreEvent.emit(this.score);
  }

  deleteScore() {
    this.deleteScoreEvent.emit(this.score);
  }

}

