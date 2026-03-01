import { Observable } from "rxjs";
import { LoginRequestEntity } from "../entities/login-information.entity";
import { LoginResponseEntity } from "../entities/login-response.entity";
import { RequestRegisterEntity } from "../entities/register-information.entity";
import { RegisterResponseEntity } from "../entities/register-response.entity";

/**
 * Contrato que define las operaciones de autenticación.
 * Debe ser implementado por la capa de datos.
 */
export abstract class AuthRepository {

    /**
     * Autentica un usuario en el sistema.
     */
    public abstract authenticateUser(
        params: LoginRequestEntity
    ): Observable<LoginResponseEntity>;

    /**
     * Registra un nuevo usuario en el sistema.
     */
    public abstract registerUser(
        params: RequestRegisterEntity
    ): Observable<RegisterResponseEntity>;
}
