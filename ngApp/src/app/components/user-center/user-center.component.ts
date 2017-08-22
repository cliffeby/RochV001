import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css'],
  providers: [UserService]
})
export class UserCenterComponent implements OnInit {
  selectedUser: User;
  private hidenewUser: boolean = true;
  users: Array<User>;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUsers()
      .subscribe(resUserData => this.users = resUserData);
  }

  onSelectUser(user: any) {
    this.selectedUser = user;
    console.log(this.selectedUser);
  }

  newUser() {
    this.hidenewUser = false;
  }

  onSubmitAddUser(user: User) {
    this._userService.addUser(user)
      .subscribe(resNewUser => {
        this.users.push(resNewUser);
        this.hidenewUser = true;
        this.selectedUser = resNewUser;
      });

  }

  onUpdateUserEvent(user: any) {
    this._userService.updateUser(user)
      .subscribe(resUpdatedUser => user = resUpdatedUser);
    this.selectedUser = null;
  };

  onDeleteUserEvent(user: any) {
    let userArray = this.users;
    this._userService.deleteUser(user)
      .subscribe(resDeletedUser => {
        for (let i = 0; i < userArray.length; i++) {
          if (userArray[i]._id === user._id) {
            userArray.splice(i, 1);
          }
        }
      });
    this.selectedUser = null;
  };

}
