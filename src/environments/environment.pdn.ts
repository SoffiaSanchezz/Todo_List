/**
 * Configuración del entorno de PRODUCCIÓN (PROD).
 * Se usa cuando la aplicación está desplegada en servidor real.
 */
export const environment = {

    /**
     * Configuración de servicios API
     */
    API_SERVICES: {
        /**
         * URL base del backend en producción
         */
        API_URL: '/api/',
    },

    /**
     * Entorno actual
     */
    environment: 'PROD',

    /**
     * Indica que la app está en producción
     */
    production: true,

    /**
     * No es entorno local
     */
    local: false,

    /**
     * Host base
     */
    host: '/',

    /**
     * Clave secreta (NO poner valores reales aquí)
     */
    secretKey: '',
};
