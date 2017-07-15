import { Scorecard } from '../models/scorecard';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ScorecardService {

  private _getUrl = "/api/scorecards";
  private _postUrl = "/api/scorecard";
  private _putUrl = "/api/scorecard/";
  private _deleteUrl = "/api/scorecard/";

  constructor(private _http: Http) { }

  getScorecards() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

  addScorecard(scorecard: Scorecard) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._postUrl, JSON.stringify(scorecard), options)
      .map((response: Response) => response.json());
  }

  updateScorecard(scorecard: Scorecard) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this._putUrl + scorecard._id, JSON.stringify(scorecard), options)
      .map((response: Response) => response.json());
  }

  deleteScorecard(scorecard: Scorecard) {
    return this._http.delete(this._deleteUrl + scorecard._id)
      .map((response: Response) => response.json());
  }

}
