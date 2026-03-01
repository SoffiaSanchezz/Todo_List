import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  onAuthStateChanged
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SessionProviderservice {

  private auth = inject(Auth);
  private platform = inject(Platform);
  currentUser: Observable<User | null>;

  constructor() {
    this.currentUser = new Observable<User | null>(observer => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
        observer.next(user);
      });
      return { unsubscribe };
    });
  }

  async login(email: string, password: string): Promise<any> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<any> {
    try {
      if (this.platform.is('cordova') || this.platform.is('capacitor')) {
        // --- LOGICA NATIVA PARA APK ---
        // @ts-ignore
        const res = await window.plugins.googleplus.login({
          'webClientId': '613562000814-9phqq8sfuulsobjuht2297784mqhrh11.apps.googleusercontent.com',
          'offline': false
        });
        const credential = GoogleAuthProvider.credential(res.idToken);
        return await signInWithCredential(this.auth, credential);
      } else {
        // --- LOGICA WEB PARA DESARROLLO ---
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(this.auth, provider);
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google: ", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    return signOut(this.auth);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser;
  }
}
