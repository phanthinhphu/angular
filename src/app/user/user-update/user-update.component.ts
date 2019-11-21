import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/share/customValidator';
import { User } from 'src/app/core/models/user.model';
import * as userActions from '../store/user.action';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit {

  title = 'CREATE';
  userForm: FormGroup;
  id;

  constructor(
    private userService: UserService,
    private store: Store<any>,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        CustomValidators.checkNumber
      ]],
      password: ['', [
        Validators.minLength(10),
        Validators.maxLength(50)
      ]]
    })

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('_id');
        if (!this.id) return false;

        this.userService.getUser(this.id).subscribe(
          (res: any) => {
            const user: User = res.user;
            this.name.setValue(user.name);
            this.birthDay.setValue(user.birthDay);
            this.phone.setValue(user.phone);
            this.email.setValue(user.email);
          }
        )
      }
    )
  }

  saveUser() {

    let newUser: User = {
      name: this.name.value,
      birthDay: this.birthDay.value,
      email: this.email.value,
      phone: this.phone.value
    }

    this.userService.updateUser(this.id,newUser).subscribe(
      (res: any) => {
        const user: User = res.user;
        const newUser = new userActions.updateUser(user);
        this.store.dispatch(newUser);
        if (res.success){
          this.notifier.notify('success', 'Success');
        }
      },
      (error: any) => this.notifier.notify('warning', error.error.message)
    )
  }

  get name() { return this.userForm.get('name') }
  get birthDay() { return this.userForm.get('birthDay') }
  get phone() { return this.userForm.get('phone') }
  get email() { return this.userForm.get('email') }
  get password() { return this.userForm.get('password') }

}
