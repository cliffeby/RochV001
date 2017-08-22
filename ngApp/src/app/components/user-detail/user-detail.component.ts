import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  inputs: ['user'],
  outputs: ['updateUserEvent', 'deleteUserEvent']
})
export class UserDetailComponent implements OnInit {
  user: any;

  private editTitle: boolean = false;
  private updateUserEvent = new EventEmitter();
  private deleteUserEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  updateUser() {
    this.updateUserEvent.emit(this.user);
  }

  deleteUser() {
    this.deleteUserEvent.emit(this.user);
  }

}

