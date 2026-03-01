/**
 * Configuración del entorno de DESARROLLO (DEV).
 * Se utiliza para pruebas y desarrollo interno.
 */
export const environment = {

    /**
     * Configuración de servicios API
     */
    API_SERVICES: {
        /**
         * URL base del backend
         */
        API_URL: '/api/',
    },

    /**
     * Nombre del entorno actual
     */
    environment: 'DEV',

    /**
     * Indica si la aplicación está en producción
     */
    production: false,

    /**
     * Indica si es un entorno local
     */
    local: false,

    /**
     * Host base de la aplicación
     */
    host: '/',

    /**
     * Clave secreta (evitar datos sensibles aquí)
     */
    secretKey: '',
};
