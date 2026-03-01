import { Injectable, inject } from "@angular/core";
import { LoginUseCase } from "../usecases";
import { AuthRepository } from "../repositories/auth.repository";
import { LoginResponseEntity } from "../entities/login-response.entity";
import { LoginRequestEntity } from "../entities/login-information.entity";
import { RegisterResponseEntity } from "../entities/register-response.entity";
import { RequestRegisterEntity } from "../entities/register-information.entity";
import { Observable } from "rxjs";

/**
 * Interactor encargado de orquestar los casos de uso
 * relacionados con la autenticación de usuarios.
 */
@Injectable()
export class AuthInteractor {
    private loginUseCase: LoginUseCase;
    private authRepository = inject(AuthRepository);

    constructor() {
        this.loginUseCase = new LoginUseCase(this.authRepository);
    }

    /**
     * Ejecuta el caso de uso de inicio de sesión.
     */
    public authenticateUser(params: LoginRequestEntity): Observable<LoginResponseEntity> {
        return this.loginUseCase.execute(params);
    }
}
