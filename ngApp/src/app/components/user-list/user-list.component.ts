import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css'],
  inputs: ['users'],
  outputs: ['SelectUser', 'CopyUserEvent', 'AddUserEvent']
})
export class UserListComponent implements OnInit {
  public SelectUser = new EventEmitter();
  public CopyUserEvent = new EventEmitter();
  public AddUserEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onSelect(usr: User) {
    this.SelectUser.emit(usr);
  }
  onAddUser() {
    this.AddUserEvent.emit();
  }
}

