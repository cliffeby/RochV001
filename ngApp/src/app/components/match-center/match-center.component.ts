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
  scores:  Array<Score>;
  scorecard: Scorecard;
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
    // this._memberservice.getMembers()
    //   .subscribe(resMemData => this.members = resMemData);
    // console.log('MSCID',match.scorecardId);
    this._scorecardservice.getScorecard(match.scorecardId)
      .subscribe(resSCData => {
          this.scorecard = resSCData;
          console.log('SCName', this.scorecard.name);
          match.scName = this.scorecard.name;
        });
    this._scoreservice.getScoreByMatch(match._id)
     .subscribe(resScoreData => {
       this.scores = resScoreData;
       this._memberservice.getMembers()
         .subscribe(resMemData => {
           this.members = resMemData;
           // console.log('THISMEMBERS',this.members);
           // console.log('ID',this.members[0]._id);
       for (let index = 0; index < this.scores.length; index++) {
         for (let i = 0; i< this.members.length; i++){
           if (this.members[i]._id === this.scores[index].memberId){
             this.members[i].isPlaying = true;
             console.log('PLAYERTRUE?', this.members[i].lastName);
           } else {
             if (!this.members[i].isPlaying) this.members[i].isPlaying = false
           }
         }
         console.log('MEMBERS', this.members);
         console.log('SCORES From MatchPlayer',this.scores[index]);
       }
      console.log('SCORES from Match', this.scores);
     }) });

    //   for (let j = 0; j < this.members.length; j++){
    //     if (this.scores[i].memberId === this.members[j]._id) {
    //     //  this.members[j].isPlaying = true;
    // for (let i = 0; i < this.scores.length; i++) {
    //       console.log('name',  this.members[j].lastName);
    //     }}}

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

