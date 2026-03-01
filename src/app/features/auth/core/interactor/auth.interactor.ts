import { Injectable, inject } from "@angular/core";
import { LoginUseCase, RegisterUseCase } from "../usecases";
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
    private registerUseCase: RegisterUseCase;
    private authRepository = inject(AuthRepository);

    constructor() {
        this.loginUseCase = new LoginUseCase(this.authRepository);
        this.registerUseCase = new RegisterUseCase(this.authRepository);
    }

    /**
     * Ejecuta el caso de uso de inicio de sesión.
     */
    public authenticateUser(params: LoginRequestEntity): Observable<LoginResponseEntity> {
        return this.loginUseCase.execute(params);
    }

    /**
     * Ejecuta el caso de uso de registro de usuario.
     */
    public registerUser(params: RequestRegisterEntity): Observable<RegisterResponseEntity> {
        return this.registerUseCase.execute(params);
    }
}
