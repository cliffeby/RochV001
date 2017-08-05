import {Component, OnInit, EventEmitter} from '@angular/core';
import { Scorecard } from "../../models/scorecard";
import { ScorecardService } from "../../services/scorecard.service"
import {IMyDpOptions} from 'mydatepicker';

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
  private myDatePickerOptions: IMyDpOptions = {
    // other options... see https://github.com/kekeh/mydatepicker
    dateFormat: 'mm.dd.yyyy',
    firstDayOfWeek: 'su',
    satHighlight: true
  };
  // Initialized to specific date (09.10.2018).
  //private model: Object = { date: { year: 2018, month: 10, day: 9 } };
  private model: any;
  private editTitle: boolean = false;
  private updateMatchEvent = new EventEmitter();
  private deleteMatchEvent = new EventEmitter();

  constructor( private _scorecardservice: ScorecardService) {
  }

  ngOnInit() {
    this._scorecardservice.getScorecards()
      .subscribe(resSCData => this.scorecards = resSCData);
    this.model =  this.match.datePlayed;
    console.log('this.model', this.model);
    if (this.match.datePlayed){
      var dateArray = this.match.datePlayed.split('-');
      this.model = { date: { year: parseInt(dateArray[0]), month: parseInt(dateArray[1]), day: parseInt(dateArray[2]) } };
    }
  }

  updateMatch() {
    //TODO DATE PLAYED is not stored as a DATE object on client
    this.match.datePlayed = (this.model.date.year+'-'+this.model.date.month+'-'+this.model.date.day);
    this._scorecardservice.getScorecard(this.match.scorecardId)
      .subscribe((resSCData) => this.match.scName = resSCData.name);
    this.updateMatchEvent.emit(this.match);
    console.log('Date', this.match.datePlayed);
  }

  deleteMatch() {
    this.deleteMatchEvent.emit(this.match);
  }
}
