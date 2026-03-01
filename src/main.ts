import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/layout/layout-routing.module';
import { LayoutComponent } from './app/layout/layout.component';
import { environment } from './environments/environment';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApiService } from '@shared/services/api/api.service';
import { provideClientHydration } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(LayoutComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    provideClientHydration(),
    ApiService,
    provideHttpClient(withFetch())
  ],
});
