/**
 * Configuración y mensajes estándar para el consumo de la API.
 */
export const ApiConfig = Object.freeze({
    contentType: 'application/json',
    carry: 'Bearer',
    internalServerError: 'Algo está fallando en el servidor, por favor contacte a soporte',
    NotFound: 'No se ha encontrado el contenido',
    Unauthorized: 'No tienes acceso a este recurso',
    unknownError: 'Error desconocido'
});
