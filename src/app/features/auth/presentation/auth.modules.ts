import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginPage } from './pages/login/login.page';
import { ReactiveFormsModule } from '@angular/forms';


import { FormsModule } from '@angular/forms';
import { AuthInteractor } from '@auth/core/interactor/auth.interactor';

/**
 * Módulo de autenticación.
 * Agrupa los componentes, rutas y dependencias necesarias
 * para el inicio de sesión y registro de usuarios.
 */
@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        AuthInteractor
    ]
})
export class AuthModule { }
