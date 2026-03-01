import { Injectable, inject } from "@angular/core";
import { from, Observable, map } from "rxjs";
import { AuthRepository } from "@auth/core/repositories/auth.repository";
import { LoginRequestEntity } from "@auth/core/entities/login-information.entity";
import { RequestRegisterEntity } from "@auth/core/entities/register-information.entity";
import {
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithCredential,
    signInWithPopup
} from '@angular/fire/auth';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
    export class AuthImplementationRepository extends AuthRepository {
        private auth = inject(Auth);
        private platform = inject(Platform);

        constructor() {
            super();
        }

    /*Inicio de sesión con Correo y Contraseña(Firebase Nativo)
    Usando userName como email y passWord de tu entidad */
    public authenticateUser(params: LoginRequestEntity): Observable < any > {
        return from(signInWithEmailAndPassword(this.auth, params.userName, params.passWord)).pipe(
            map(userCredential => userCredential.user));
    }

    /*Registro con Correo y Contraseña(Firebase Nativo) */
    public registerUser(params: RequestRegisterEntity): Observable < any > {
        return from(createUserWithEmailAndPassword(this.auth, params.email, params.passWord)).pipe(
            map(userCredential => userCredential.user));
    }

    /** Inicio de sesión con Google (Nativo en APK / Popup en Web)*/
    public loginWithGoogle(): Observable < any > {
        if(this.platform.is('cordova') || this.platform.is('capacitor')) {
        return from(this.nativeGoogleLogin());
    } else {
        const provider = new GoogleAuthProvider();
        return from(signInWithPopup(this.auth, provider)).pipe(
            map(userCredential => userCredential.user));
    }}

    private async nativeGoogleLogin(): Promise < any > {
    // @ts-ignore
    const res = await window.plugins.googleplus.login({
        'webClientId': '613562000814-9phqq8sfuulsobjuht2297784mqhrh11.apps.googleusercontent.com',
        'offline': false
    });
    const credential = GoogleAuthProvider.credential(res.idToken);
    const userCredential = await signInWithCredential(this.auth, credential);
    return userCredential.user;
}
}
