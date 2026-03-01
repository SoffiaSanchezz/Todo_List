import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, Observable } from "rxjs";
import { environment } from "@environments/environment";
import { ApiService } from "@shared/services/api/api.service";
import { AuthRepository } from "@auth/core/repositories/auth.repository";
import { LoginRequestEntity } from "@auth/core/entities/login-information.entity";
import { LoginResponseEntity } from "@auth/core/entities/login-response.entity";
import { RequestRegisterEntity } from "@auth/core/entities/register-information.entity";
import { RegisterResponseEntity } from "@auth/core/entities/register-response.entity";

/**
 * Implementación real del repositorio de autenticación.
 * Se encarga de la comunicación con el backend mediante HTTP.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthImplementationRepository extends AuthRepository {

    /**
     * URL base de los servicios de autenticación.
     */
    public apiUrl: string;
    private apiService = inject(ApiService);

    constructor() {
        super();
        this.apiUrl = environment?.API_SERVICES?.API_URL;
    }

    /**
     * Envía la solicitud de inicio de sesión al backend.
     */
    public authenticateUser(
        params: LoginRequestEntity
    ): Observable<LoginResponseEntity> {
        return this.apiService.post(`${this.apiUrl}/authenticate`, params);
    }

    /**
     * Envía la solicitud de registro de usuario al backend.
     */
    public registerUser(
        params: RequestRegisterEntity
    ): Observable<RegisterResponseEntity> {
        return this.apiService.post(`${this.apiUrl}/register`, params);
    }
}
