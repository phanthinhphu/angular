import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';


const bookRoutes: Routes = [
    {
        path: '', component: BookComponent, children: [
            { path: '', component: BookListComponent },
            { path: 'create', component: BookFormComponent },
            { path: 'edit/:_id', component: BookFormComponent }
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(bookRoutes)],
    exports:[RouterModule]
})

export class BookRouteModule{}