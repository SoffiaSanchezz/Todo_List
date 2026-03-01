/**
 * Información necesaria para autenticar un usuario.
 */
export interface LoginInformationEntity {
    userName: string;
    passWord: string;
}

/**
 * Solicitud de inicio de sesión.
 */
export interface LoginRequestEntity extends LoginInformationEntity { }
