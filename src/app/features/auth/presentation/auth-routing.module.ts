import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPage } from "./pages/login/login.page";

/**
 * Define las rutas del módulo de autenticación.
 */
const routes: Routes = [
    { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
