import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";

/**
 * Define las rutas del módulo de autenticación.
 */
const routes: Routes = [
    { path: 'register', component: RegisterPage },
    { path: 'login', component: LoginPage }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
