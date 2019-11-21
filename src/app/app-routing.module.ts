import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const appRouter: Routes = [
    { path: '', redirectTo: 'author', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.AuthorModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'typebook',
        loadChildren: () => import('./type-book/type-book.module').then(m => m.TypeBookModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'card',
        loadChildren: () => import('./card/card.module').then(m => m.CardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'publisher',
        loadChildren: () => import('./publisher/publisher.module').then(m => m.PublisherModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'reader',
        loadChildren: () => import('./reader/reader.module').then(m => m.ReaderModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.BookModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        //canActivate: [AuthGuard]
    },
    {
        path: 'borrow',
        loadChildren: () => import('./borrow/borrow.module').then(m => m.BorrowModule),
        canActivate: [AuthGuard]
    },
    {
        path:'**',
        redirectTo:''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRouter)],
    exports: [RouterModule]
})

export class AppRouterModule { }