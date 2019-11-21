import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ReaderComponent } from './reader.component';
import { ReaderListComponent } from './reader-list/reader-list.component';
import { ReaderFormComponent } from './reader-form/reader-form.component';

const ReaderRoutes: Routes = [
    {
        path: '', component: ReaderComponent, children: [
            { path: '', component: ReaderListComponent },
            { path: 'create', component: ReaderFormComponent },
            { path: 'edit/:_id', component: ReaderFormComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(ReaderRoutes)],
    exports: [RouterModule]
})

export class ReaderRouteModule { }