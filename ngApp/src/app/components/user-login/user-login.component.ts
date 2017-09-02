import { Component, OnInit, EventEmitter } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  outputs: ['loginUserEvent', 'registerUserEvent'],
  providers: [UserService]
})
export class UserLoginComponent implements OnInit {
  user: any;
  private loginUserEvent = new EventEmitter();
  private registerUserEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  loginUser() {
    this.loginUserEvent.emit(this.user);
  }

  registerUser() {
    this.registerUserEvent.emit(this.user);
  }

}
