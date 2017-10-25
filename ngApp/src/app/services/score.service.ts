import { Score } from '../models/score';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ScoreService {
  private _server = 'http://localhost:3000';
  private _getUrl = '/api/scores';
  private _postUrl = '/api/scores';
  private _putUrl = '/api/scores/';
  private _deleteUrl = '/api/scores/';

  constructor(public auth: AuthService, public _authHttp: AuthHttp) { }

  getScores() {
    return this._authHttp.get(this._server + this._getUrl)
      .map((response: Response) => response.json());
  }
  getScoreByMatch(matchId: string) {
    return this._authHttp.get(this._server + this._getUrl+ 'ByMatch/' + matchId)
      .map((response: Response) => response.json());
  }

  addScore(score: Score) {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._authHttp.post(this._server + this._postUrl, JSON.stringify(score), options)
      .map((response: Response) => response.json());
  }

  updateScore(score: Score) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._authHttp.put(this._server + this._putUrl + score._id, JSON.stringify(score), options)
      .map((response: Response) => response.json());
  }

  deleteScore(score: Score) {
    return this._authHttp.delete(this._server + this._deleteUrl + score._id)
      .map((response: Response) => response.json());
  }

}
