import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/share/customValidator';
import { User } from 'src/app/core/models/user.model';
import * as userActions from '../store/user.action';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  title = 'CREATE';
  userForm: FormGroup;
  id;

  constructor(
    private userService: UserService,
    private store: Store<any>,
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
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]]
    })
  }

  saveUser() {

    let newUser: User = {
      name: this.name.value,
      birthDay: this.birthDay.value,
      email: this.email.value,
      phone: this.phone.value,
      password: this.password.value
    }

    this.userService.createUser(newUser).subscribe(
      (res: any) => {
        const user: User = res.user;
        const newUser = new userActions.createUser(user);
        this.store.dispatch(newUser);
        if (res.success){
          this.clearUserForm();
          this.notifier.notify('success', 'Success');
        }
      },
      (error: any) => this.notifier.notify('warning', error.error.message)
    )
  }

  clearUserForm(){
    this.name.setValue('');
    this.birthDay.setValue('');
    this.phone.setValue('');
    this.email.setValue('');
    this.password.setValue('');
  }

  get name() { return this.userForm.get('name') }
  get birthDay() { return this.userForm.get('birthDay') }
  get phone() { return this.userForm.get('phone') }
  get email() { return this.userForm.get('email') }
  get password() { return this.userForm.get('password') }

}
