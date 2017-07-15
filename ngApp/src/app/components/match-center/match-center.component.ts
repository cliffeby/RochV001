import { MatchService } from '../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { Match } from "../../models/match";
@Component({
  selector: 'app-match-center',
  templateUrl: './match-center.component.html',
  styleUrls: ['./match-center.component.css'],
  providers: [MatchService]
})
export class MatchCenterComponent implements OnInit {
  selectedMatch: Match;
  private hidenewMatch: boolean = true;
  matches: Array<Match>;
  constructor(private _matchservice: MatchService) { }

  ngOnInit() {
    this._matchservice.getMatches()
      .subscribe(resMatchData => this.matches = resMatchData);
  }

  onSelectMatch(match: any) {
    this.selectedMatch = match;
    console.log(this.selectedMatch);
  }

  newMatch() {
    this.hidenewMatch = false;
  }

  onSubmitAddMatch(match: Match) {
    this._matchservice.addMatch(match)
      .subscribe(resNewMatch => {
        this.matches.push(resNewMatch);
        this.hidenewMatch = true;
        this.selectedMatch = resNewMatch;
      });

  }

  onUpdateMatchEvent(match: any) {
    this._matchservice.updateMatch(match)
      .subscribe(resUpdatedMatch => match = resUpdatedMatch);
    this.selectedMatch = null;
  };

  onDeleteMatchEvent(match: any) {
    let matchArray = this.matches;
    this._matchservice.deleteMatch(match)
      .subscribe(resDeletedMatch => {
        for (let i = 0; i < matchArray.length; i++) {
          if (matchArray[i]._id === match._id) {
            matchArray.splice(i, 1);
          }
        }
      });
    this.selectedMatch = null;
  };

}

