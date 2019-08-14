import { Scorecard } from '../models/scorecard';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ScorecardService {
  // Allows ng serve to reach server api.  Need CORS enabled in Chrome.
  private _server = 'http://localhost:3000';
//
  private _getUrl = '/api/scorecards';
  private _postUrl = '/api/scorecards';
  private _putUrl = '/api/scorecards/';
  private _deleteUrl = '/api/scorecards/';

  constructor(public auth: AuthService, public _authHttp: AuthHttp) { }

  getScorecards()  {
    return this._authHttp.get(this._server + this._getUrl)
      .map((response: Response) => response.json());
  }

  getScorecard(_id: string) {
    return this._authHttp.get(this._server + this._getUrl + '/' + _id)
      .map((response: Response) => response.json());
  }

  addScorecard(scorecard: Scorecard) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._authHttp.post(this._server + this._postUrl, JSON.stringify(scorecard), options)
      .map((response: Response) => response.json());
  }

  updateScorecard(scorecard: Scorecard) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log('SCService', scorecard, JSON.stringify(scorecard));
    return this._authHttp.put(this._server + this._putUrl + scorecard._id, JSON.stringify(scorecard), options)
      .map((response: Response) => response.json());
  }

  deleteScorecard(scorecard: Scorecard) {
    return this._authHttp.delete(this._server + this._deleteUrl + scorecard._id)
      .map((response: Response) => response.json());
  }

}
