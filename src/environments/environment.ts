/**
 * Configuración del entorno LOCAL de la aplicación.
 * Este archivo se utiliza durante el desarrollo.
 */
export const environment = {

  /**
   * Configuración de los servicios API.
   */
  API_SERVICES: {
    /**
     * URL base para el consumo de servicios backend.
     */
    API_URL: '/api/',
  },

  /**
   * Nombre del entorno actual.
   */
  environment: 'LOCAL',

  /**
   * Indica si la aplicación está en modo producción.
   */
  production: false,

  /**
   * Indica si se está usando configuración local.
   */
  local: true,

  /**
   * Host base de la aplicación.
   */
  host: '/',

  /**
   * Clave secreta para configuraciones internas
   * (no usar valores sensibles en entornos locales).
   */
  secretKey: '',
};
