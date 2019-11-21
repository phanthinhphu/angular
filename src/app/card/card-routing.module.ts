import { Routes, RouterModule, RouterState } from '@angular/router';
import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { CardFormComponent } from './card-form/card-form.component';
import { CardListComponent } from './card-list/card-list.component';

const cardRoutes: Routes = [
    {
        path: '', component: CardComponent, children: [
            { path: '', component: CardListComponent },
            { path: 'create', component: CardFormComponent },
            { path: 'edit/:_id', component: CardFormComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(cardRoutes)],
    exports: [RouterModule]
})

export class CardRouteModule { }