import { Score } from '../models/score';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ScoreService {
  private _server = 'http://localhost:3000';
  private _getUrl = "/api/scores";
  private _postUrl = "/api/score";
  private _putUrl = "/api/score/";
  private _deleteUrl = "/api/score/";

  constructor(private _http: Http) { }

  getScores() {
    return this._http.get(this._server + this._getUrl)
      .map((response: Response) => response.json());
  }
  getScoreByMatch(matchId: string){
    return this._http.get(this._server + this._getUrl+ 'ByMatch/' + matchId)
      .map((response: Response) => response.json());
  }

  addScore(score: Score) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log('MADEIT ADD SCORE', score, headers, options, JSON.stringify(score));
    return this._http.post(this._server + this._postUrl, JSON.stringify(score), options)
      .map((response: Response) => response.json());
  }

  updateScore(score: Score) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this._server + this._putUrl + score._id, JSON.stringify(score), options)
      .map((response: Response) => response.json());
  }

  deleteScore(score: Score) {
    return this._http.delete(this._server + this._deleteUrl + score._id)
      .map((response: Response) => response.json());
  }

}
