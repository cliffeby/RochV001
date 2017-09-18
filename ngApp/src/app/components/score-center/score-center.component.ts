import { ScoreService } from '../../services/score.service';
import { Component, OnInit } from '@angular/core';
import { Score } from "../../models/score";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-score-center',
  templateUrl: './score-center.component.html',
  styleUrls: ['./score-center.component.css'],
  providers: [ScoreService]
})
export class ScoreCenterComponent implements OnInit {
  selectedScore: Score;
  hidePlus: boolean;
  private hidenewScore: boolean = true;
  scores: Array<Score>;
  constructor(private _scoreService: ScoreService,
              private auth: AuthService) { }

  ngOnInit() {
    this._scoreService.getScores()
      .subscribe(resScoreData => this.scores = resScoreData);
    this.hidePlus = this.auth.userHasScopes(['create:scores'])
    console.log('hideplus', this.hidePlus);
  }

  onSelectScore(score: any) {
    this.selectedScore = score;
    console.log(this.selectedScore);
  }

  newScore() {
    this.hidenewScore = false;

  }

  onSubmitAddScore(score: Score) {
    this._scoreService.addScore(score)
      .subscribe(resNewScore => {
        this.scores.push(resNewScore);
        this.hidenewScore = true;
        this.selectedScore = resNewScore;
      });

  }

  onUpdateScoreEvent(score: any) {
    this._scoreService.updateScore(score)
      .subscribe(resUpdatedScore => score = resUpdatedScore);
    this.selectedScore = null;
  };

  onDeleteScoreEvent(score: any) {
    let scoreArray = this.scores;
    this._scoreService.deleteScore(score)
      .subscribe(resDeletedScore => {
        for (let i = 0; i < scoreArray.length; i++) {
          if (scoreArray[i]._id === score._id) {
            scoreArray.splice(i, 1);
          }
        }
      });
    this.selectedScore = null;
  };
}

