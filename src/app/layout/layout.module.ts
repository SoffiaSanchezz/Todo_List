import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
//Import component reutilizables
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
//Import modules
import { LayoutRoutingModule } from './layout-routing.module';

// import { ServiceProviderModule } from '../core/service-providers/service-provider.module';
import { ServiceProviderModule } from '../core/services-providers/service-provider.modules';
import { SessionProviderservice } from '@shared/services/auth/session-provider.service';
import { ApiService } from '@shared/services/api/api.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        IonicModule.forRoot(), 

        ServiceProviderModule,
        LayoutComponent,
        HeaderComponent,
        PageNotFoundComponent,
    ],
    
    providers: [
        provideClientHydration(),
        ApiService,
        provideHttpClient(withFetch()),
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    // declarations: [LayoutComponent],
    // bootstrap: [LayoutComponent],
})
export class LayoutModule { }
