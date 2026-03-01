// src/app/login/login.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SessionProviderservice } from 'src/app/shared/services/auth/session-provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  errorMessage: string | null = null;
  loginForm: FormGroup
  isLoading = false
  passwordVisible = false


  constructor(
    private SessionProviderservice: SessionProviderservice,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit() { }

  async login() {
    this.errorMessage = null;

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, introduce tu email y contraseña.';
      return;
    }

    try {
      const userCredential = await this.SessionProviderservice.login(this.email, this.password);
      console.log('Inicio de sesión exitoso:', userCredential.user);
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      this.handleAuthError(error);
      switch (error.code) {
        case 'auth/user-not-found':
          this.errorMessage = 'No existe una cuenta con este email.';
          break;
        case 'auth/wrong-password':
          this.errorMessage = 'Contraseña incorrecta.';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'El formato del email es incorrecto.';
          break;
        case 'auth/too-many-requests':
          this.errorMessage = 'Demasiados intentos fallidos. Inténtalo de nuevo más tarde.';
          break;
        default:
          this.errorMessage = 'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.';
          break;
      }
    }
  }

  async loginWithGoogle() {
    this.errorMessage = null;
    try {
      const userCredential = await this.SessionProviderservice.signInWithGoogle();
      console.log('Inicio de sesión exitoso con Google:', userCredential.user);
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      console.error('Error al iniciar sesión con Google:', error);
      this.handleAuthError(error);
    }
  }

  private handleAuthError(error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
        this.errorMessage = 'No existe una cuenta con este email.';
        break;
      case 'auth/wrong-password':
        this.errorMessage = 'Contraseña incorrecta.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'El formato del email es incorrecto.';
        break;
      case 'auth/popup-closed-by-user':
        this.errorMessage = 'El proceso de inicio de sesión con Google fue cancelado.';
        break;
      case 'auth/cancelled-popup-request':
        this.errorMessage = 'Ya hay una ventana de inicio de sesión abierta. Por favor, ciérrala y vuelve a intentarlo.';
        break;
      case 'auth/account-exists-with-different-credential':
        this.errorMessage = 'Ya existe una cuenta con este email, pero con otro método de inicio de sesión. Intenta iniciar sesión con tu método original.';
        break;
      case 'auth/network-request-failed':
        this.errorMessage = 'Problema de conexión a la red. Por favor, inténtalo de nuevo.';
        break;
      case 'auth/too-many-requests':
        this.errorMessage = 'Demasiados intentos fallidos. Inténtalo de nuevo más tarde.';
        break;
      default:
        this.errorMessage = 'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.';
        break;
    }
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }
}
