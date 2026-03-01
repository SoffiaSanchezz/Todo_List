import { LoginResponseEntity } from "@auth/core/entities/login-response.entity";

/**
 * Mock de respuesta para el inicio de sesión.
 * Utilizado para pruebas y desarrollo sin backend.
 */
export const authenticateUserMock: LoginResponseEntity = {
    token: 'Bearer fajkero111111vvavi4134faafeaga5agaga',
    userName: 'Enrique Lopez',
    email: 'example@gmail.com',
    documentType: 'CC',
    documentNumber: '101312432',
    contractNumber: '32145678',
};
