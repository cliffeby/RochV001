import { Component, OnInit, EventEmitter } from '@angular/core';
import { Score } from '../../models/score';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'score-list',
  templateUrl: 'score-list.component.html',
  styleUrls: ['score-list.component.css'],
  inputs: ['scores'],
  outputs: ['SelectScore'],
  providers: [AuthService]
})
export class ScoreListComponent implements OnInit {
  public SelectScore = new EventEmitter();
  private unauth: boolean;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.unauth = this.auth.userHasScopes(['read:scores']);
    console.log('UNAUTH', this.unauth);
  }

  onSelectScore(scr: Score) {
    this.SelectScore.emit(scr);
  }

}
