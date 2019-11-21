import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PublisherComponent } from './publisher.component';
import { PublisherListComponent } from './publisher-list/publisher-list.component';
import { PublisherFormComponent } from './publisher-form/publisher-form.component';

const publisherRoutes: Routes = [
    {
        path: '', component: PublisherComponent, children: [
            { path: '', component: PublisherListComponent },
            { path: 'create', component: PublisherFormComponent },
            { path: 'edit/:_id', component: PublisherFormComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(publisherRoutes)],
    exports: [RouterModule]
})

export class PublisherRouteModule { }