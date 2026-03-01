import { Injectable } from '@angular/core';

/**
 * Servicio encargado de gestionar la información de sesión
 * del usuario autenticado.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionProviderservice {

  /**
   * Token de autenticación del usuario.
   */
  public informationToken: string = '';

  /**
   * Retorna el token de sesión actual.
   */
  public getInformationToken(): string {
    return this.informationToken;
  }

  /**
   * Almacena el token de sesión.
   */
  public setInformationToken(token: string): string {
    return this.informationToken = token;
  }
}
