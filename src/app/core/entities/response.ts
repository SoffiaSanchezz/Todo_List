/**
 * Interfaz genérica que representa la estructura estándar de una respuesta (Response).
 *
 * @template T Tipo de los datos retornados en la respuesta.
 *
 * Se utiliza para encapsular el resultado de una operación,
 * incluyendo información de estado, mensajes descriptivos
 * y los datos obtenidos.
 */
export interface Response<T> {

    /**
     * Código de estado de la respuesta.
     * Puede representar estados de éxito, error o validación.
     * Ejemplo: '200', '400', '500'.
     */
    code: string;

    /**
     * Mensaje descriptivo del resultado de la operación.
     */
    message: string;

    /**
     * Datos retornados por la operación.
     */
    data: T;
}
