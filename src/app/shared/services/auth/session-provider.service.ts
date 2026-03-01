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
      throw error;
    }
  }

  async signInWithGoogle(): Promise<any> {
    try {
      if (this.platform.is('cordova') || this.platform.is('capacitor')) {
        // --- LOGICA NATIVA CORREGIDA ---
        return new Promise((resolve, reject) => {
          // @ts-ignore
          if (!window.plugins || !window.plugins.googleplus) {
            return reject({ code: 'plugin_not_found', message: 'Plugin GooglePlus no instalado correctamente' });
          }

          // @ts-ignore
          window.plugins.googleplus.login(
            {
              'webClientId': '613562000814-9phqq8sfuulsobjuht2297784mqhrh11.apps.googleusercontent.com',
              'offline': false
            },
            async (res: any) => {
              try {
                const credential = GoogleAuthProvider.credential(res.idToken);
                const userCredential = await signInWithCredential(this.auth, credential);
                resolve(userCredential);
              } catch (firebaseErr) {
                reject(firebaseErr);
              }
            },
            (err: any) => {
              reject({ code: 'google_plugin_error', message: err });
            }
          );
        });
      } else {
        // --- LOGICA WEB ---
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(this.auth, provider);
      }
    } catch (error) {
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