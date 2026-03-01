import { Observable } from 'rxjs';

/**
 * Interfaz genérica que define la estructura base de un Caso de Uso (Use Case).
 *
 * @template S Tipo de los parámetros de entrada.
 * @template T Tipo del resultado que retorna el caso de uso.
 *
 * Esta interfaz se utiliza para estandarizar la ejecución de la lógica
 * de negocio dentro de la aplicación, permitiendo que los casos de uso
 * retornen resultados de forma síncrona (Promise) o reactiva (Observable).
 */
export interface UseCase<S, T> {

    /**
     * Ejecuta el caso de uso con los parámetros proporcionados.
     *
     * @param params Parámetros necesarios para ejecutar el caso de uso.
     * @returns Un Observable o una Promise con el resultado de la operación.
     */
    execute(params: S): Observable<T> | Promise<T>;
}
