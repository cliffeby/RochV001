import {Component, OnInit, EventEmitter} from '@angular/core';
import { Scorecard } from "../../models/scorecard";
import { ScorecardService } from "../../services/scorecard.service"

@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css'],
  inputs: ['match'],
  outputs: ['updateMatchEvent', 'deleteMatchEvent']
})
export class MatchDetailComponent implements OnInit {
  match: any;
  scorecards: Array<Scorecard>;

  private editTitle: boolean = false;
  private updateMatchEvent = new EventEmitter();
  private deleteMatchEvent = new EventEmitter();

  constructor( private _scorecardservice: ScorecardService) {
  }

  ngOnInit() {
    this._scorecardservice.getScorecards()
      .subscribe(resSCData => this.scorecards = resSCData);
  }


  updateMatch() {
    this.updateMatchEvent.emit(this.match);
  }

  deleteMatch() {
    this.deleteMatchEvent.emit(this.match);
  }

}
