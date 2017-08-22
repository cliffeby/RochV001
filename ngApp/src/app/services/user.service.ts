import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  //Allows ng serve to reach server api.  Need CORS enabled in Chrome.
  private _server = "http://localhost:3000";
//
  private _getUrl = "/api/users";
  private _postUrl = "/api/users";
  private _putUrl = "/api/users/";
  private _deleteUrl = "/api/users/";

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get(this._server + this._getUrl)
      .map((response: Response) => response.json());
  }
  getUser(_id: string){
    return this._http.get(this._server + this._getUrl + '/' + _id)
      .map((response: Response) => response.json());
  }

  addUser(user: User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._server + this._postUrl, JSON.stringify(user), options)
      .map((response: Response) => response.json());
  }

  updateUser(user: User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this._server + this._putUrl + user._id, JSON.stringify(user), options)
      .map((response: Response) => response.json());
  }

  deleteUser(user: User) {
    return this._http.delete(this._server + this._deleteUrl + user._id)
      .map((response: Response) => response.json());
  }

}
