/**
 * Respuesta del sistema tras un inicio de sesión exitoso.
 */
export interface LoginResponseEntity {
    token: string;
    userName: string;
    email: string;
    documentType: string;
    documentNumber: string;
    contractNumber: string;
}
