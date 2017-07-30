import {Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css'],
  inputs: ['match'],
  outputs: ['updateMatchEvent', 'deleteMatchEvent']
})
export class MatchDetailComponent implements OnInit {
  match: any;

  private editTitle: boolean = false;
  private updateMatchEvent = new EventEmitter();
  private deleteMatchEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }


  updateMatch() {
    this.updateMatchEvent.emit(this.match);
  }

  deleteMatch() {
    this.deleteMatchEvent.emit(this.match);
  }

}
