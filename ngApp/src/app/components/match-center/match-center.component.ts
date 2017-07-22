import { MatchService } from '../../services/match.service';
import { MemberService } from '../../services/member.service';
import { ScoreService } from '../../services/score.service';
import { ScorecardService } from '../../services/scorecard.service';
import { Component, OnInit } from '@angular/core';
import { Match } from "../../models/match";
import { Member } from "../../models/member";
import { Score } from "../../models/score";
import { Scorecard } from "../../models/scorecard";
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
  members: Array<Member>;
  score:  Array<Score>;
  constructor(private _matchservice: MatchService,
              private _scoreservice: ScoreService,
              private _scorecardservice: ScorecardService,
              private _memberservice: MemberService) { }

  ngOnInit() {
    this._matchservice.getMatches()
      .subscribe(resMatchData => this.matches = resMatchData);
  }

  onSelectMatch(match: any) {
    this.selectedMatch = match;
    console.log('selectedMatch',this.selectedMatch);
    this._memberservice.getMembers()
      .subscribe(resMemData => this.members = resMemData);
    console.log('MSCID',match.scorecardId);
    this._scorecardservice.getScorecard(match.scorecardId)
      .subscribe((scorecard)=> console.log('Scorecard',scorecard));
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

