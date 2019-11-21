import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NgModule } from '@angular/core';
import { UserUpdateComponent } from './user-update/user-update.component';


const userRoutes: Routes = [
    {
        path: '', component: UserComponent, children: [
            { path: '', component: UserListComponent },
            { path: 'create', component: UserFormComponent },
            { path: 'edit/:_id', component: UserUpdateComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRouteModule { }