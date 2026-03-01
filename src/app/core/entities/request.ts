/**
 * Interfaz genérica que representa la estructura de una solicitud (Request).
 *
 * @template T Tipo de los datos contenidos en la solicitud.
 *
 * Se utiliza para encapsular la información de entrada que será enviada
 * a un caso de uso, servicio o capa de dominio, manteniendo una estructura
 * uniforme en toda la aplicación.
 */
export interface Request<T> {

    /**
     * Datos principales de la solicitud.
     */
    data: T;
}
