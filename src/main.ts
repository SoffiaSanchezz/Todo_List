import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/layout/layout-routing.module';
import { LayoutComponent } from './app/layout/layout.component';
import { environment } from './environments/environment';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApiService } from '@shared/services/api/api.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { ServiceProviderModule } from './app/core/services-providers/service-provider.modules';

const firebaseConfig = {
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  projectId: environment.firebase.projectId,
  storageBucket: environment.firebase.storageBucket,
  messagingSenderId: environment.firebase.messagingSenderId,
  appId: environment.firebase.appId,
  measurementId: environment.firebase.measurementId
};

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
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    importProvidersFrom(ServiceProviderModule)
  ],
});
