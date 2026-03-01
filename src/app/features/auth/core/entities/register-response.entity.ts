import { RegisterInformationEntity } from "./register-information.entity";

/**
 * Respuesta del sistema tras un registro exitoso.
 */
export interface RegisterResponseEntity extends RegisterInformationEntity {
    token: string;
}
