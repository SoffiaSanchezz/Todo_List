import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: "/auth/login",
        pathMatch: 'full'
    },
    { path: 'auth', loadChildren: () => import('../features/auth/presentation/auth.modules').then(m => m.AuthModule) },
    { path: 'todo', loadChildren: () => import('../features/todo/todo.module').then(m => m.TodoModule) },
    {
        path: '**',
        component: PageNotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
