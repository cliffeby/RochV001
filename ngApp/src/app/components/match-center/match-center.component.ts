import {MatchService} from '../../services/match.service';
import {MemberService} from '../../services/member.service';
import {ScoreService} from '../../services/score.service';
import {ScorecardService} from '../../services/scorecard.service';
import {Component, OnInit} from '@angular/core';
import {Match} from '../../models/match';
import {Member} from '../../models/member';
import {Score} from '../../models/score';
import {Scorecard} from '../../models/scorecard';
import {IMyDpOptions} from 'mydatepicker';
import * as moment from 'moment/moment';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-match-center',
  templateUrl: './match-center.component.html',
  styleUrls: ['./match-center.component.css'],
  providers: [MatchService]
})
export class MatchCenterComponent implements OnInit {
  selectedMatch: Match;
  match: Match;
  private hidenewMatch = true;
  private queryString: string;
  matches: Array<Match>;
  members: Array<Member>;
  scores: Array<Score>;
  scorecards: Array<Scorecard>;
  scorecard: Scorecard;
  private model: any;
  private today: any;
  private myday: Date;
  private myDatePickerOptions: IMyDpOptions = {
    // other options... see https://github.com/kekeh/mydatepicker
    dateFormat: 'mm.dd.yyyy',
    firstDayOfWeek: 'su',
    satHighlight: true
  };


  constructor(private _matchservice: MatchService,
              private _scoreservice: ScoreService,
              private _scorecardservice: ScorecardService,
              private _memberservice: MemberService,
              private auth: AuthService) {
    const date1: Date = new Date();
    this.today = date1.getFullYear() + '-' + (Number(date1.getMonth() + 1)) + '-' + date1.getDate();
  }

  ngOnInit() {
    this.myday = new Date();
    this.queryString = "";
    this._matchservice.getMatches()
      .subscribe(resMatchData => {
         this.matches = resMatchData;
        for (let i = 0; i < this.matches.length; i++) {
          this.matches[i].dateFlag = moment(this.myday).subtract(1,'days').isBefore(this.matches[i].datePlayed);
        }
      });
    this._scorecardservice.getScorecards()
      .subscribe(resSCData => {
          this.scorecards = resSCData;
          for (let index = 0; index < this.scorecards.length; index++) {
            for (let i = 0; i < this.matches.length; i++) {
              if (this.matches[i].scorecardId === this.scorecards[index]._id) {
                this.matches[i].scName = this.scorecards[index].name;
              }
            }
          }
        }
      );
  }

  onSelectMatch(match: any) {
    this.selectedMatch = match;
    if (match.scorecardId) {
      this._scorecardservice.getScorecard(match.scorecardId)
        .subscribe(resSCData => {
          this.scorecard = resSCData;
          match.scName = this.scorecard.name;
        });
    }
    this._scoreservice.getScoreByMatch(match._id)
      .subscribe(resScoreData => {
        this.scores = resScoreData;
        this._memberservice.getMembers()
          .subscribe(resMemData => {
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

  newMatch() {
    this.match = new Match();
    let dateArray = this.today.split('-');
    this.model = {date: {year: parseInt(dateArray[0]), month: parseInt(dateArray[1]), day: parseInt(dateArray[2])}};
    this.hidenewMatch = false;
  }

  onSubmitAddMatch(match: Match) {
    match.datePlayed = (this.model.date.year + '-' + this.model.date.month + '-' + this.model.date.day);

    this._matchservice.addMatch(match)
      .subscribe(resNewMatch => {
        // TODO Populate SCName on match list Not working
        this._scorecardservice.getScorecard(this.match.scorecardId)
          .subscribe((resSCData) => this.match.scName = resSCData.name);
        // TODO push to top of heap
        this.matches.push(resNewMatch);
        this.hidenewMatch = true;
        this.selectedMatch = null;
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

