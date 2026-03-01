import { UseCase } from "src/app/core/base";
import { AuthRepository } from "@auth/core/repositories/auth.repository";
import { LoginResponseEntity } from "@auth/core/entities/login-response.entity";
import { LoginRequestEntity } from "@auth/core/entities/login-information.entity";
import { Observable } from "rxjs";

/**
 * Caso de uso encargado del inicio de sesión de usuarios.
 */
export class LoginUseCase
    implements UseCase<LoginRequestEntity, LoginResponseEntity> {

    constructor(private authRepository: AuthRepository) { }

    /**
     * Ejecuta el proceso de autenticación.
     */
    public execute(
        params: LoginRequestEntity
    ): Observable<LoginResponseEntity> {
        return this.authRepository.authenticateUser(params);
    }
}
