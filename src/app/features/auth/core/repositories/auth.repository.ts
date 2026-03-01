import { Observable } from "rxjs";
import { LoginRequestEntity } from "../entities/login-information.entity";
import { LoginResponseEntity } from "../entities/login-response.entity";
import { RequestRegisterEntity } from "../entities/register-information.entity";
import { RegisterResponseEntity } from "../entities/register-response.entity";

export abstract class AuthRepository {
    public abstract authenticateUser(params: LoginRequestEntity): Observable<any>;
    public abstract registerUser(params: RequestRegisterEntity): Observable<any>;
    public abstract loginWithGoogle(): Observable<any>;
}
