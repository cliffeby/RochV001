import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../../../services/auth.service';
import 'rxjs/add/observable/throw';


export interface User {
  login: string;
  _id: string;
}

@Injectable()
export class AAAService {

  private _server = 'http://localhost:3000';

  private Url = '/api/mocks';
  private UrlId = this.Url + '/1';

  constructor( private _authHttp: HttpClient) { }

  getUsers() {
    return this._authHttp.get<User[]>(this._server + this.Url);
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
