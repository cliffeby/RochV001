import { ScorecardService } from '../../services/scorecard.service';
import { Component, OnInit } from '@angular/core';
import { Scorecard } from "../../models/scorecard";

@Component({
  selector: 'app-scorecards',
  templateUrl: './scorecards.component.html',
  styleUrls: ['./scorecards.component.css'],
  providers: [ScorecardService]
})
export class ScorecardsComponent implements OnInit {
  selectedScorecard: Scorecard;
  private hidenewScorecard: boolean = true;
  scorecards: Array<Scorecard>;

  constructor(private _scorecardService: ScorecardService) { }

  ngOnInit() {
    this._scorecardService.getScorecards()
      .subscribe(resScorecardData => this.scorecards = resScorecardData);
  }

  onSelectScorecard(scorecard: any) {
    this.selectedScorecard = scorecard;
    console.log(this.selectedScorecard);
  }

  newScorecard() {
    this.hidenewScorecard = false;
  }

  onSubmitAddScorecard(scorecard: Scorecard) {
    this._scorecardService.addScorecard(scorecard)
      .subscribe(resNewScorecard => {
        this.scorecards.push(resNewScorecard);
        this.hidenewScorecard = true;
        this.selectedScorecard = null;
        // this.selectedScorecard = resNewScorecard;
      });

  }
  onCopyAddScorecard(scorecard: Scorecard) {
    let copiedScorecard = scorecard;
    copiedScorecard.name = scorecard.name + " COPY";
    this._scorecardService.addScorecard(copiedScorecard)
      .subscribe(resNewScorecard => {
        this.scorecards.push(resNewScorecard);
        this.hidenewScorecard = true;
        this.selectedScorecard = null;
        this._scorecardService.getScorecards()
          .subscribe(resScorecardData => this.scorecards = resScorecardData);
        // this.selectedScorecard = resNewScorecard;
      });

  }

  onUpdateScorecardEvent(scorecard: any) {
    this._scorecardService.updateScorecard(scorecard)
      .subscribe(resUpdatedScorecard => scorecard = resUpdatedScorecard);
    this.selectedScorecard = null;
  };

  onDeleteScorecardEvent(scorecard: any) {
    let scorecardArray = this.scorecards;
    this._scorecardService.deleteScorecard(scorecard)
      .subscribe(resDeletedScorecard => {
        for (let i = 0; i < scorecardArray.length; i++) {
          if (scorecardArray[i]._id === scorecard._id) {
            scorecardArray.splice(i, 1);
          }
        }
      });
    this.selectedScorecard = null;
  };
}
