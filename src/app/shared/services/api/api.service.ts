import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
    HttpStatusCode,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiConfig } from "@shared/services/api/api.config";
import { SessionProviderservice } from '../auth/session-provider.service';

/**
 * Servicio encargado de centralizar las peticiones HTTP a la API.
 * Maneja encabezados, autenticación y errores de forma global.
 */
@Injectable()
export class ApiService {
    private http = inject(HttpClient);
    private readonly sessionProvider = inject(SessionProviderservice);


    /**
     * Encabezados base para las solicitudes HTTP.
     */
    public reqHeader: HttpHeaders;

    constructor() {
        this.reqHeader = new HttpHeaders({
            'Content-Type': ApiConfig.contentType,
            Authorization: `${ApiConfig.carry} ${this.sessionProvider.getInformationToken()}`,
        });
    }

    /**
     * Realiza una petición HTTP GET.
     */
    public get(url: string, params?: HttpParams): Observable<any> {
        return this.http
            .get<any>(url, { headers: this.reqHeader, params })
            .pipe(
                catchError((error: HttpErrorResponse) => this.errorHandler(error)),
                map((response: any) => response)
            );
    }

    /**
     * Realiza una petición HTTP POST.
     */
    public post(url: string, data: any, params?: HttpParams): Observable<any> {
        return this.http
            .post<any>(url, data, { headers: this.reqHeader, params })
            .pipe(
                catchError((error: HttpErrorResponse) => this.errorHandler(error)),
                map((response: any) => response)
            );
    }

    /**
     * Realiza una petición HTTP PUT.
     */
    public put(url: string, data: any): Observable<any> {
        return this.http
            .put<any>(url, data, { headers: this.reqHeader })
            .pipe(
                catchError((error: HttpErrorResponse) => this.errorHandler(error)),
                map((response: any) => response)
            );
    }

    /**
     * Realiza una petición HTTP PATCH.
     */
    public patch(url: string, data: any): Observable<any> {
        return this.http
            .patch<any>(url, data, { headers: this.reqHeader })
            .pipe(
                catchError((error: HttpErrorResponse) => this.errorHandler(error)),
                map((response: any) => response)
            );
    }

    /**
     * Realiza una petición HTTP DELETE.
     */
    public delete(url: string, params?: HttpParams): Observable<any> {
        return this.http
            .delete<any>(url, { headers: this.reqHeader, params })
            .pipe(
                catchError((error: HttpErrorResponse) => this.errorHandler(error)),
                map((response: any) => response)
            );
    }

    /**
     * Maneja los errores HTTP de forma centralizada.
     */
    private errorHandler(error: HttpErrorResponse) {
        switch (error.status) {
            case HttpStatusCode.BadRequest:
                return throwError(() => new HttpErrorResponse({ error }));
            case HttpStatusCode.InternalServerError:
                return throwError(() => new Error(ApiConfig.internalServerError));
            case HttpStatusCode.NotFound:
                return throwError(() => new Error(ApiConfig.NotFound));
            case HttpStatusCode.Unauthorized:
                return throwError(() => new Error(ApiConfig.Unauthorized));
            default:
                return throwError(() => new Error(ApiConfig.unknownError));
        }
    }
}
