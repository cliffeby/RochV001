import { Match } from '../models/match';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class MatchService {
  private _server = 'http://localhost:3000';
  private _getUrl = '/api/matches';
  private _postUrl = '/api/matches';
  private _putUrl = '/api/matches/';
  private _deleteUrl = '/api/matches/';

  constructor(public auth: AuthService, public _authHttp: AuthHttp) { }

  getMatches() {
    return this._authHttp.get(this._server + this._getUrl)
      .map((response: Response) => response.json());
  }

  addMatch(match: Match) {
    // console.log("Match added")
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._authHttp.post(this._server + this._postUrl, JSON.stringify(match), options)
      .map((response: Response) => response.json());
  }

  updateMatch(match: Match) {
    // console.log("Match updateded")
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._authHttp.put(this._server + this._putUrl + match._id, JSON.stringify(match), options)
      .map((response: Response) => response.json());
  }

  deleteMatch(match: Match) {
    return this._authHttp.delete(this._server + this._deleteUrl + match._id)
      .map((response: Response) => response.json());
  }

}
