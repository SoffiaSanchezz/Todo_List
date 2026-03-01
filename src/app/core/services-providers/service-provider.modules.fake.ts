import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRepository } from '@auth/core/repositories/auth.repository';
import { AuthImplementationRepositoryFake } from '@auth/data/repositories/auth-implementation.repository.fake';

/**
 * Módulo proveedor de servicios que registra implementaciones falsas (Fake)
 * de los repositorios para pruebas o entornos controlados.
 *
 * Permite simular el comportamiento del repositorio de autenticación
 * sin depender de servicios externos o APIs reales.
 */
@NgModule({
    providers: [
        {
            /**
             * Cuando se solicite AuthRepository, Angular inyectará
             * AuthImplementationRepositoryFake en lugar de la implementación real.
             */
            provide: AuthRepository,
            useClass: AuthImplementationRepositoryFake,
        },
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class ServiceProviderModule { }
