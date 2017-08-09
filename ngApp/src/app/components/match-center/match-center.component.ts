import {MatchService} from '../../services/match.service';
import {MemberService} from '../../services/member.service';
import {ScoreService} from '../../services/score.service';
import {ScorecardService} from '../../services/scorecard.service';
import {Component, OnInit} from '@angular/core';
import {Match} from "../../models/match";
import {Member} from "../../models/member";
import {Score} from "../../models/score";
import {Scorecard} from "../../models/scorecard";
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-match-center',
  templateUrl: './match-center.component.html',
  styleUrls: ['./match-center.component.css'],
  providers: [MatchService]
})
export class MatchCenterComponent implements OnInit {
  selectedMatch: Match;
  match: Match;
  private hidenewMatch: boolean = true;
  private queryString: string;
  matches: Array<Match>;
  members: Array<Member>;
  scores: Array<Score>;
  scorecards: Array<Scorecard>;
  scorecard: Scorecard;
  private model: any;
  private today: any;
  private myDatePickerOptions: IMyDpOptions = {
    // other options... see https://github.com/kekeh/mydatepicker
    dateFormat: 'mm.dd.yyyy',
    firstDayOfWeek: 'su',
    satHighlight: true
  };


  constructor(private _matchservice: MatchService,
              private _scoreservice: ScoreService,
              private _scorecardservice: ScorecardService,
              private _memberservice: MemberService) {
    let date: Date = new Date();
    this.today = date.getFullYear()+'-'+(Number(date.getMonth()+1))+'-'+date.getDate();
    console.log('DAT', date, this.today);
  }


  ngOnInit() {
    this.queryString = "";
    this._matchservice.getMatches()
      .subscribe(resMatchData => {
          this.matches = resMatchData;
        }
      );
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
    console.log('selectedMatch', this.selectedMatch);
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
            // console.log('THISMEMBERS',this.members);
            // console.log('ID',this.members[0]._id);
            for (let index = 0; index < this.scores.length; index++) {
              for (let i = 0; i < this.members.length; i++) {
                if (this.members[i]._id === this.scores[index].memberId) {
                  this.members[i].isPlaying = true;
                } else {
                  if (!this.members[i].isPlaying) this.members[i].isPlaying = false
                }
              }
            }
          })
      });
  }

  newMatch() {
    this.match = new Match();
    var dateArray = this.today.split('-');
    this.model = { date: { year: parseInt(dateArray[0]), month: parseInt(dateArray[1]), day: parseInt(dateArray[2]) } };
    this.hidenewMatch = false;
  }

  onSubmitAddMatch(match: Match) {
    match.datePlayed = (this.model.date.year+'-'+this.model.date.month+'-'+this.model.date.day);
    this._matchservice.addMatch(match)
      .subscribe(resNewMatch => {
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

