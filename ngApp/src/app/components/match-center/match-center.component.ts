import {MatchService} from '../../services/match.service';
import {MemberService} from '../../services/member.service';
import {ScoreService} from '../../services/score.service';
import {ScorecardService} from '../../services/scorecard.service';
import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatchListComponent } from '../match-list/match-list.component';
import {Match} from '../../models/match';
import {Member} from '../../models/member';
import {Score} from '../../models/score';
import {Scorecard} from '../../models/scorecard';
import {IMyDpOptions} from 'mydatepicker';
import * as moment from 'moment/moment';
import {AuthService} from '../../services/auth.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: "app-match-center",
  templateUrl: "./match-center.component.html",
  styleUrls: ["./match-center.component.css"],
  providers: [MatchService]
})
export class MatchCenterComponent implements OnInit {
  selectedMatch: Match;
  scoredMatch: Match;
  public match: Match;
  public mat: Match;
  private hidenewMatch = true;
  private scoreMatch: boolean = false;
  private queryString: string;
  matches: Array<Match>;
  members: Array<Member>;
  scores: Array<Score>;
  scorecards: Array<Scorecard>;
  scorecard: Scorecard;
  private model: any;
  private today: any;
  private myday: Date;
  private fullName: string;
  messageFromList: any;
  // public ds: { playerNames: string; playersHCap: string }[] = [];
  public ds = new Array();
  private myDatePickerOptions: IMyDpOptions = {
    // other options... see https://github.com/kekeh/mydatepicker
    dateFormat: "mm.dd.yyyy",
    firstDayOfWeek: "su",
    satHighlight: true
  };

  constructor(
    private _matchservice: MatchService,
    private _scoreservice: ScoreService,
    private _scorecardservice: ScorecardService,
    private _memberservice: MemberService,
    private auth: AuthService
  ) {
    const date1: Date = new Date();
    this.today =
      date1.getFullYear() +
      "-" +
      Number(date1.getMonth() + 1) +
      "-" +
      date1.getDate();
  }

  ngOnInit() {
    this.myday = new Date();
    this.queryString = "";
    this._matchservice.getMatches().subscribe(resMatchData => {
      this.matches = resMatchData;
      for (let i = 0; i < this.matches.length; i++) {
        this.matches[i].dateFlag = moment(this.myday)
          .subtract(1, "days")
          .isBefore(this.matches[i].datePlayed);
      }

      this._scorecardservice.getScorecards().subscribe(resSCData => {
        // TODO scorecard isn't returned on startup???
        this.scorecards = resSCData;
        for (let index = 0; index < this.scorecards.length; index++) {
          for (let i = 0; i < this.matches.length; i++) {
            // console.log("Matches",index, i, this.matches[i])
            if (this.matches[i].scorecardId === this.scorecards[index]._id) {
              this.matches[i].scName = this.scorecards[index].name;
            }
          }
        }
      });
    });
    this._matchservice.matchSelected.subscribe((match: Match) => {
      console.log("MatchCenter OnSelected", match);
      this.selectedMatch = match;
      this.onSelectMatch(match);
    });
    this._matchservice.matchScored.subscribe((match: Match) => {
      console.log("MatchCenter OnScored", match);
      this.scoredMatch = match;
      this.onSelectMatch(match);
      this.onScoreMatch(match);
    });
  }

  addMatch() {
    this.match = new Match();
    this.hidenewMatch = false;
    // this._scoreservice.getScores()
    //   .subscribe(resScoreData => {
    //     this.scores = resScoreData;
    //   });
    // this._memberservice.getMembers()
    //   .subscribe(resMemData => {
    //     this.members = resMemData;
    //   });
    // this.match.players = 0;
    this.selectedMatch = this.match;
  }

  onSelectMatch(match: Match) {
    // this.selectedMatch = match;
    if (match.scorecardId) {
      this._scorecardservice
        .getScorecard(match.scorecardId)
        .subscribe(resSCData => {
          this.scorecard = resSCData;
          match.scName = this.scorecard.name;
          match.memberIds = [];
          match.playerNames = [];
          match.playersHCap = [];
        });
    }
    this._scoreservice.getScoreByMatch(match._id).subscribe(resScoreData => {
      this.scores = resScoreData;
      this._memberservice.getMembers().subscribe(resMemData => {
        this.members = resMemData;
        match.players = 0;
        for (let index = 0; index < this.scores.length; index++) {
          for (let i = 0; i < this.members.length; i++) {
            if (this.members[i]._id === this.scores[index].memberId) {
              this.fullName =
                this.members[i].firstName + " " + this.members[i].lastName;
              this.members[i].isPlaying = true;
              match.playerNames = [...match.playerNames, this.fullName];
              match.memberIds = [...match.memberIds, this.members[i]._id];
              match.playersHCap = [
                ...match.playersHCap,
                this.members[i].currentHCap
              ];
              match.players++;
            } else {
              if (!this.members[i].isPlaying) {
                this.members[i].isPlaying = false;
              }
            }
          }
        }
      });
    });
    return match;
  }

  onPairMatch(match: any) {
    this.selectedMatch = match;
    if (match.scorecardId) {
      this._scorecardservice
        .getScorecard(match.scorecardId)
        .subscribe(resSCData => {
          this.scorecard = resSCData;
          match.scName = this.scorecard.name;
        });
    }
    this._scoreservice.getScoreByMatch(match._id).subscribe(resScoreData => {
      this.scores = resScoreData;
      this._memberservice.getMembers().subscribe(resMemData => {
        this.members = resMemData;
        match.players = 0;
        for (let index = 0; index < this.scores.length; index++) {
          for (let i = 0; i < this.members.length; i++) {
            if (this.members[i]._id === this.scores[index].memberId) {
              this.members[i].isPlaying = true;
              match.players++;
            } else {
              if (!this.members[i].isPlaying) {
                this.members[i].isPlaying = false;
              }
            }
          }
        }
      });
    });
  }

  onSubmitAddMatchEvent(match: Match) {
    // match.datePlayed = (this.model.date.year + '-' + this.model.date.month + '-' + this.model.date.day);

    this._matchservice.addMatch(match).subscribe(resNewMatch => {
      // TODO Populate SCName on match list Not working
      // this._scorecardservice.getScorecard(match.scorecardId)
      //   .subscribe((resSCData) => match.scName = resSCData.name);
      match.dateFlag = moment(this.myday)
        .subtract(1, "days")
        .isBefore(match.datePlayed);
      console.log("This match oUAddEvent", match);
      this.matches.unshift(match); //unshift pushes match to matches[0] - temporarily is first on list
      this.hidenewMatch = true;
      this.selectedMatch = null;
    });
  }

  onUpdateMatchEvent(match: any) {
    match.dateFlag = moment(this.myday)
      .subtract(1, "days")
      .isBefore(match.datePlayed);
    this._matchservice
      .updateMatch(match)
      .subscribe(resUpdatedMatch => (match = resUpdatedMatch));
    this.selectedMatch = null;
    console.log("This match onUpdateEvent", match);
    return match;
  }

  onScoreMatch(match: Match) {
    // match = this.onUpdateMatchEvent(match);

    //     this._matchservice
    //       .getMatch(match._id)
    //       .subscribe(resdata => (this.myDataSourrece = resdata));
    // // this.selectedMatch = {
    // //   ...this.selectedMatch,
    // //   name: this.selectedMatch.name + "."
    // // };
    // console.log(
    //   "Score match from match center0",
    //   this.scoredMatch,this.myDataSourrece,
    //   match
    // );
    if (match.scorecardId) {
      this._scorecardservice
        .getScorecard(match.scorecardId)
        .subscribe(resSCData => {
          this.scorecard = resSCData;
          match.scName = this.scorecard.name;
          match.memberIds = [];
          match.playerNames = [];
          match.playersHCap = [];
          // this.ds["playerNames"] =[];
          // this.ds["playersHCap"] = [];
        });
    }
    this._scoreservice.getScoreByMatch(match._id).subscribe(resScoreData => {
      this.scores = resScoreData;
      this._memberservice.getMembers().subscribe(resMemData => {
        this.members = resMemData;
        match.players = 0;
        for (let index = 0; index < this.scores.length; index++) {
          for (let i = 0; i < this.members.length; i++) {
            if (this.members[i]._id === this.scores[index].memberId) {
              this.fullName =
                this.members[i].firstName + " " + this.members[i].lastName;
              this.members[i].isPlaying = true;
              // this.ds["playerNames"].push(this.fullName);
              match.playerNames = [...match.playerNames, this.fullName];

              match.memberIds = [...match.memberIds, this.members[i]._id];
              match.playersHCap = [...match.playersHCap, this.members[i].currentHCap];
              this.ds.push({"playerNames":this.fullName, "playersHCap":this.members[i].currentHCap})
              // this.ds["playersHCap"].push(this.members[i].currentHCap);
              match.players++;
            } else {
              if (!this.members[i].isPlaying) {
                this.members[i].isPlaying = false;
              }
            }
          }
        }
      });
    });
    console.log("DS", this.ds);
    this.scoreMatch = true;
    this.scoredMatch = match;
    this._matchservice.dsArray.emit(this.ds);
  }

  onDeleteMatchEvent(match: any) {
    let matchArray = this.matches;
    console.log("DELETE MATCH", match);
    this._matchservice.deleteMatch(match).subscribe(resDeletedMatch => {
      for (let i = 0; i < matchArray.length; i++) {
        if (matchArray[i]._id === match._id) {
          matchArray.splice(i, 1);
        }
      }
    });
    this.selectedMatch = null;
    this.ngOnInit();
    // this._matchservice.getMatches()
    //   .subscribe(resMatchData => {
    //     this.matches = resMatchData;
    //   });
  }
}

