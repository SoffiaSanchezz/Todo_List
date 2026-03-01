// src/app/login/login.page.ts
import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SessionProviderservice } from 'src/app/shared/services/auth/session-provider.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, HeaderComponent]
})
export class LoginPage implements OnInit {
  errorMessage: string | null = null;
  loginForm: FormGroup;
  isLoading = false;
  passwordVisible = false;

  constructor(
    private sessionService: SessionProviderservice,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() { }

  async login() {
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, introduce un email válido y una contraseña de al menos 6 caracteres.';
      return;
    }

    // Extraemos los valores directamente del FormBuilder
    const { email, password } = this.loginForm.value;

    try {
      this.isLoading = true;
      const userCredential = await this.sessionService.login(email, password);
      console.log('Inicio de sesión exitoso:', userCredential.user);

      this.ngZone.run(() => {
        this.router.navigateByUrl('/todo', { replaceUrl: true });
      });

    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      this.handleAuthError(error);
    } finally {
      this.isLoading = false;
    }
  }

  async loginWithGoogle() {
    this.errorMessage = null;
    try {
      this.isLoading = true;
      const userCredential = await this.sessionService.signInWithGoogle();
      console.log('Inicio de sesión exitoso con Google:', userCredential.user);

      this.ngZone.run(() => {
        this.router.navigateByUrl('/todo', { replaceUrl: true });
      });

    } catch (error: any) {
      console.error('Error al iniciar sesión con Google:', error);
      this.handleAuthError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private handleAuthError(error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/invalid-credential': // Firebase usa este para mayor seguridad
        this.errorMessage = 'Credenciales inválidas. Revisa tu correo y contraseña.';
        break;
      case 'auth/wrong-password':
        this.errorMessage = 'Contraseña incorrecta.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'El formato del email es incorrecto.';
        break;
      case 'auth/network-request-failed':
        this.errorMessage = 'Problema de conexión a la red.';
        break;
      default:
        this.errorMessage = 'Error al iniciar sesión. Verifica tus datos.';
        break;
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
