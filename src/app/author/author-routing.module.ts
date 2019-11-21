import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthorComponent } from './author.component';
import { ListAuthorComponent } from './list-author/list-author.component';
import { AuthorFormComponent } from './author-form/author-form.component';

const authorRoutes: Routes = [
    {
        path: '', component: AuthorComponent, children: [
            { path: '', component: ListAuthorComponent },
            { path: 'create', component: AuthorFormComponent },
            { path: 'edit/:_id', component: AuthorFormComponent }

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authorRoutes)
    ],
    exports: [RouterModule]
})

export class AuthorRouteModule { }