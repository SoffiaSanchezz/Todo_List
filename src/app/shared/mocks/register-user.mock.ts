import { RegisterResponseEntity } from "@auth/core/entities/register-response.entity";

/**
 * Mock de respuesta para el registro de usuario.
 * Utilizado para pruebas y desarrollo sin backend.
 */
export const registerUserMock: RegisterResponseEntity = {
    token: 'Bearer fajkero111111vvavi4134faafeaga5agaga',
    userName: 'Enrique Lopez',
    passWord: 'example',
    email: 'example@gmail.com',
    contractNumber: 32145678,
    phoneNumber: '3144879860',
};
