import { Member } from '../models/member';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class MemberService {

  private _server = 'http://localhost:3000';

  private _getUrl = '/api/members';
  private _postUrl = '/api/members';
  private _putUrl = '/api/members/';
  private _deleteUrl = '/api/members/';

  constructor(public auth: AuthService, public _authHttp: AuthHttp) { }

  getMembers() {
    return this._authHttp.get(this._server + this._getUrl)
      .map((response: Response) => response.json());
  }

  addMember(member: Member) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._authHttp.post(this._server + this._postUrl, JSON.stringify(member), options)
      .map((response: Response) => response.json());
  }

  updateMember(member: Member) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._authHttp.put(this._server + this._putUrl + member._id, JSON.stringify(member), options)
      .map((response: Response) => response.json());
  }

  deleteMember(member: Member) {
    return this._authHttp.delete(this._server + this._deleteUrl + member._id)
      .map((response: Response) => response.json());
  }
}
