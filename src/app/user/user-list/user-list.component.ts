import { Component, OnInit } from '@angular/core';
import { User, UserState } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/core/services/user.service';
import * as userActions from '../store/user.action';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private store: Store<UserState>,
    private userService: UserService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {

    this.store.select('user').subscribe(
      users => this.users = users
    )

    this.userService.getUsers().subscribe(
      (res: any) => {
        const users: User[] = res.users;
        const newUser = new userActions.getUsers(users);
        this.store.dispatch(newUser)
      }
    )

  }

  deleteUser(_id) {
    this.userService.deleteUser(_id).subscribe(
      (res: any) => {
        const user: User = res.user;
        const newUser = new userActions.deleteUser(user);
        this.store.dispatch(newUser);
        if (res.success)
          this.notifier.notify('success','Success')
      },
      (error:any)=> this.notifier.notify('warning',error.error.message)
    )
  }

}
