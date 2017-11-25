import { Member } from '../../../models/member';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest,  HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../../../services/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';


export interface User {
  login: string;
  _id: string;
}

@Injectable()
export class AAAService {

  private _server = 'http://localhost:3000';

  private _getUrl = '/api/mocks';
  private _postUrl = '/api/mocks';
  private _putUrl = '/api/mocks/1';
  private _deleteUrl = '/api/mocks/1';

  //constructor( private _authHttp: HttpClient) { }
  constructor(private auth: AuthService, private _authHttp: HttpClient) { }

  getUsers() {
    return this._authHttp.get<User[]>(this._server + this._getUrl);
  }

  addUser(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new HttpRequest({ headers: headers });
    return this._authHttp.post(this._server + this._postUrl, user);
     // .map((response: Response) => response.json());
  }

  updateUser(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const options = new HttpRequest( headers,'json');
    return this._authHttp.put(this._server + this._putUrl, user, headers);
    //  .map((response: Response) => response.json());
  }

  deleteUser(user: User) {
    return this._authHttp.delete(this._server + this._deleteUrl)
     // .map((response: Response) => response.json());
  }
}
