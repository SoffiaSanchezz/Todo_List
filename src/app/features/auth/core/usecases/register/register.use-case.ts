import { UseCase } from "src/app/core/base";
import { AuthRepository } from "@auth/core/repositories/auth.repository";
import { RegisterResponseEntity } from "@auth/core/entities/register-response.entity";
import { RequestRegisterEntity } from "@auth/core/entities/register-information.entity";
import { Observable } from "rxjs";

/**
 * Caso de uso encargado del registro de usuarios.
 */
export class RegisterUseCase
    implements UseCase<RequestRegisterEntity, RegisterResponseEntity> {

    constructor(private registerRepository: AuthRepository) { }

    /**
     * Ejecuta el proceso de registro.
     */
    public execute(
        params: RequestRegisterEntity
    ): Observable<RegisterResponseEntity> {
        return this.registerRepository.registerUser(params);
    }
}
