import { Member } from '../models/member';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MemberService {

  private _server = 'http://localhost:3000';

  private _getUrl = "/api/members";
  private _postUrl = "/api/members";
  private _putUrl = "/api/members/";
  private _deleteUrl = "/api/members/";

  constructor(private _http: Http) { }

  getMembers() {
    return this._http.get(this._server + this._getUrl)
      .map((response: Response) => response.json());
  }

  addMember(member: Member) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._server + this._postUrl, JSON.stringify(member), options)
      .map((response: Response) => response.json());
  }

  updateMember(member: Member) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this._server + this._putUrl + member._id, JSON.stringify(member), options)
      .map((response: Response) => response.json());
  }

  deleteMember(member: Member) {
    return this._http.delete(this._server + this._deleteUrl + member._id)
      .map((response: Response) => response.json());
  }

}
