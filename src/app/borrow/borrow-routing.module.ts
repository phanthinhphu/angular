import { Routes, RouterModule } from "@angular/router";
import { BorrowComponent } from './borrow.component';
import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BorrowFormComponent } from './borrow-form/borrow-form.component';
import { NgModule } from '@angular/core';


const borrowRoutes: Routes = [
    {
        path: '', component: BorrowComponent, children: [
            { path: '', component: BorrowListComponent },
            { path: 'create', component: BorrowFormComponent },
            { path: 'edit/:_id', component: BorrowFormComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(borrowRoutes)],
    exports: [RouterModule]
})

export class BorrowRouteModule { }