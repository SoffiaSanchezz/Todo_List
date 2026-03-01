import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SessionProviderservice {

  private auth: Auth;
  currentUser: Observable<User | null>;

  constructor() {
    this.auth = inject(Auth);
    this.currentUser = new Observable<User | null>(observer => {
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        observer.next(user);
      });
      return { unsubscribe };
    });
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<any> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      return userCredential;
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
