import {Component, OnInit, EventEmitter} from '@angular/core';
import {Member} from '../../models/member';
import {Score} from '../../models/score';
import {Match} from '../../models/match';
import {ScoreService} from '../../services/score.service';

@Component({
  selector: 'member-block',
  templateUrl: 'member-block.component.html',
  styleUrls: ['member-block.component.css'],
  inputs: ['members', 'scores', 'match'],
  outputs: ['SelectMember']
})
export class MemberBlockComponent implements OnInit {
  public SelectMember = new EventEmitter();
  members: Array<Member>;
  scores: Array<Score>;
  match;
  Match;
  private score = new Score();
  private queryString: string;

  constructor(private _scoreservice: ScoreService) {
  }

  ngOnInit() {
    this.queryString = "";
    console.log("From member-block0", this.match.players, this.score.name);
  }

  onSelect(mem: Member) {
    this.SelectMember.emit(mem);
  }

  playerinMatch(member) {
    member.isPlaying = !member.isPlaying;
    if (member.isPlaying) {
      this.match.players++;
      this.score.matchId = this.match._id;
      this.score.memberId = member._id;
      this.score.cap = member.currentHCap;
      this.score.name = this.match.name + ' ' + member.lastName;
      this._scoreservice.addScore(this.score)
        .subscribe(resNewScore => {
          this.scores= [...this.scores,resNewScore];
        });
        console.log('From member-block1', this.match.players, this.score.name)
    } else {
      this.match.players--;
      const scoreArray = this.scores;
      for (let i = 0; i < this.scores.length; i++) {
        if (this.scores[i].memberId === member._id && this.scores[i].matchId === this.match._id) {
          this._scoreservice.deleteScore(this.scores[i])
            .subscribe(resDeletedScore => {
              for (let i = 0; i < scoreArray.length; i++) {
                if (scoreArray[i]._id === this.score._id) {
                  scoreArray.splice(i, 1);
                }
              }
            });
        }
      }
    }
  }
}
