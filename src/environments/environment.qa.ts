/**
 * Configuración del entorno de QA (Quality Assurance)
 * Usado para pruebas internas y validaciones antes de PROD.
 */
export const environment = {

    /**
     * Configuración de servicios API
     */
    API_SERVICES: {
        /**
         * URL base del backend en QA
         */
        API_URL: '/api/',
    },

    /**
     * Identificador del entorno
     */
    environment: 'QA',

    /**
     * No es producción
     */
    production: false,

    /**
     * No es entorno local
     */
    local: false,

    /**
     * Host base
     */
    host: '/',

    /**
     * Clave secreta (no usar valores reales aquí)
     */
    secretKey: '',
};
