import { Match } from '../models/match';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchService {

  private _getUrl = "/api/matches";
  private _postUrl = "/api/match";
  private _putUrl = "/api/match/";
  private _deleteUrl = "/api/match/";

  constructor(private _http: Http) { }

  getMatches() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

  addMatch(match: Match) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._postUrl, JSON.stringify(match), options)
      .map((response: Response) => response.json());
  }

  updateMatch(match: Match) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this._putUrl + match._id, JSON.stringify(match), options)
      .map((response: Response) => response.json());
  }

  deleteMatch(match: Match) {
    return this._http.delete(this._deleteUrl + match._id)
      .map((response: Response) => response.json());
  }

}
