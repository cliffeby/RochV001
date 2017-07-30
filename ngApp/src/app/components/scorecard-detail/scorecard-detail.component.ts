import {Component, OnInit, EventEmitter} from '@angular/core';
import {Scorecard} from "../../models/scorecard";

@Component({
  selector: 'scorecard-detail',
  templateUrl: './scorecard-detail.component.html',
  styleUrls: ['./scorecard-detail.component.css'],
  inputs: ['scorecard'],
  outputs: ['updateScorecardEvent', 'deleteScorecardEvent']
})
export class ScorecardDetailComponent implements OnInit {
  scorecard: any;

  private editTitle: boolean = false;
  private updateScorecardEvent = new EventEmitter();
  private deleteScorecardEvent = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
    init2(this.scorecard);

    function init2(scorecard: Scorecard) {
      let front9Par: number = 0, back9Par: number = 0;
      let front9Yards: number = 0, back9Yards: number = 0;
      let pars: string[] = ('PAR,' + scorecard.parInputString).split(',');
      let hCaps: string[] = ('HCAP,' + scorecard.hCapInputString).split(',');
      let yards: string[] = ('YARDS,' + scorecard.yardsInputString).split(',');

      for (var i = 1; i < pars.length - 9; i++) {
        front9Par = front9Par + Number(pars[i]);
      }
      for (var j = 10; j < pars.length; j++) {
        back9Par += Number(pars[j]);
      }
      let total18Par = front9Par + back9Par;
      pars.splice(10, 0, String(front9Par));
      pars.splice(20, 0, String(back9Par));
      pars.splice(21, 0, String(total18Par));

      for (var i = 1; i < yards.length - 9; i++) {
        front9Yards = front9Yards + Number(yards[i]);
      }
      for (var j = 10; j < yards.length; j++) {
        back9Yards += Number(yards[j]);
      }
      let total18Yards: number = front9Yards + back9Yards;

      yards.splice(10, 0, String(front9Yards));
      yards.splice(20, 0, String(back9Yards));
      yards.splice(21, 0, String(total18Yards));
      hCaps.splice(10, 0, '  ');

      // let holes: string[] = ['Hole', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'F9',
      //     '10', '11', '12', '13', '14', '15', '16', '17', '18', 'B9', 'Tot'];
      //
      // scorecard.holes = holes;
      scorecard.yards = yards;
      scorecard.hCaps = hCaps;
      scorecard.pars = pars;
    }
  }

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  updateScorecard() {
    this.updateScorecardEvent.emit(this.scorecard);
  }

  deleteScorecard() {
    this.deleteScorecardEvent.emit(this.scorecard);
  }

}
