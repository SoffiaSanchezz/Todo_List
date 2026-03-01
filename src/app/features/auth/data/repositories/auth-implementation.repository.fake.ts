import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, Observable, of } from "rxjs";
import { AuthRepository } from "@auth/core/repositories/auth.repository";
import { LoginRequestEntity } from "@auth/core/entities/login-information.entity";
import { LoginResponseEntity } from "@auth/core/entities/login-response.entity";
import { RequestRegisterEntity } from "@auth/core/entities/register-information.entity";
import { RegisterResponseEntity } from "@auth/core/entities/register-response.entity";
import { authenticateUserMock } from "@shared/mocks/authenticate-user.mock";
import { registerUserMock } from "@shared/mocks/register-user.mock";

/**
 * Implementación fake del repositorio de autenticación.
 * Simula las respuestas del backend para pruebas y desarrollo.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthImplementationRepositoryFake extends AuthRepository {

    /**
     * Simula el inicio de sesión de un usuario.
     */
    public authenticateUser(
        params: LoginRequestEntity
    ): Observable<LoginResponseEntity> {
        return of(authenticateUserMock).pipe(delay(1500));
    }

    /**
     * Simula el registro de un usuario.
     */
    public registerUser(
        params: RequestRegisterEntity
    ): Observable<RegisterResponseEntity> {
        return of(registerUserMock).pipe(delay(1500));
    }
}
