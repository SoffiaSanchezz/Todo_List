/**
 * Información necesaria para el registro de un usuario.
 */
export interface RegisterInformationEntity {
    userName: string;
    email: string;
    passWord: string;
    contractNumber: number;
    phoneNumber: string;
}

/**
 * Solicitud de registro de usuario.
 */
export interface RequestRegisterEntity extends RegisterInformationEntity { }
