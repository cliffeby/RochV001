// Service in same format as other services
// Get, Add, Update and Delete methods

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import { AuthHttp } from 'angular2-jwt';
// import { AuthService } from '../../../services/auth.service';
// import 'rxjs/add/observable/throw';
// import { strictEqual } from 'assert';
// import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';


export interface User {
  login: string;
  _id: string;
}

@Injectable()
export class AAAService {

   _server = 'http://localhost:3000';

   Url = '/api/mocks';
   UrlId = this.Url + '/1';

  // Change the auth service to standard Http
  constructor( private _authHttp: HttpClient) { }
  // constructor( private _authHttp: HttpClient, private _auth: AuthService, private _realAuthHttp: AuthHttp) { }

  getUsers() {
    return this._authHttp.get<User[]>(this._server + this.Url);
  }
  // getAuthUsers() {
  //   return this._realAuthHttp.get(this._server + this.Url);
  // }
  getSingleUser(id: number) {
    return this._authHttp.get<User>(this._server + this.Url + this.UrlId);
  }

  addUser(user: User) {
    return this._authHttp.post(this._server + this.Url, user);
  }

  updateUser(user: User) {
    return this._authHttp.put(this._server + this.UrlId, user);
  }

  deleteUser(user: User) {
    return this._authHttp.delete(this._server + this.UrlId)
  }
}
