import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeBookComponent } from './type-book.component';
import { TypeBookListComponent } from './type-book-list/type-book-list.component';
import { TypeBookFormComponent } from './type-book-form/type-book-form.component';

const typeBookRoutes: Routes = [
    {
        path: '', component: TypeBookComponent, children: [
            { path: '', component: TypeBookListComponent },
            { path: 'create', component: TypeBookFormComponent },
            { path: 'edit/:_id', component: TypeBookFormComponent },
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(typeBookRoutes)],
    exports: [RouterModule]
})

export class TypeBookRouteModule { }