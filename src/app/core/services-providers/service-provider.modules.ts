import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from '@environments/environment';
import { CommonModule } from '@angular/common';
import { AuthRepository } from '@auth/core/repositories/auth.repository';
import { AuthImplementationRepository } from '@auth/data/repositories/auth-implementation.repository';

/**
 * Módulo encargado de proveer las implementaciones de los repositorios
 * a través del sistema de inyección de dependencias de Angular.
 *
 * Este módulo permite desacoplar la capa de dominio de la capa de datos,
 * siguiendo los principios de Clean Architecture.
 */
@NgModule({
    providers: [
        {
            /**
             * Define qué implementación concreta se usará cuando se
             * inyecte AuthRepository.
             *
             * AuthRepository → AuthImplementationRepository
             */
            provide: AuthRepository,
            useClass: AuthImplementationRepository,
        },
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class ServiceProviderModule { }
