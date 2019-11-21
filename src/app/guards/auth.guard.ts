import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { User, UserState } from '../core/models/user.model';
import { Store } from '@ngrx/store';
import * as userActions from '../login/store/login.action';
@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService,
        private store: Store<UserState>,

    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let localUser : User = JSON.parse(localStorage.getItem('user'))
        if (localUser) {
            this.userService.checkToken(localUser.token).subscribe(
                (res: any) => {
                    const user: User = res.user;
                    localUser.phone = user.phone;
                    localUser.name = user.name;
                    localUser.birthDay = user.birthDay;
                    localUser.email = user.email;
                    localStorage.removeItem('user');
                    localStorage.setItem('user',JSON.stringify(localUser))
                },
                (error: any) => {
                    localStorage.removeItem('user');
                    this.router.navigate(['/login']);
                }
            )

            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}