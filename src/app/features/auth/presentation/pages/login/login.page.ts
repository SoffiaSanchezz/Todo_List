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
      this.errorMessage = 'Formulario inválido. Revisa los campos.';
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      this.isLoading = true;
      const result = await this.sessionService.login(email, password);

      this.ngZone.run(() => {
        this.router.navigate(['/todo'], { replaceUrl: true });
      });

    } catch (error: any) {
      this.handleAuthError(error);
    } finally {
      this.isLoading = false;
    }
  }

  async loginWithGoogle() {
    this.errorMessage = null;
    try {
      this.isLoading = true;
      const result = await this.sessionService.signInWithGoogle();

      setTimeout(() => {
        this.ngZone.run(() => {
          this.router.navigate(['/todo'], { replaceUrl: true });
        });
      }, 500);

    } catch (error: any) {
      this.handleAuthError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private handleAuthError(error: any) {
    if (error.code === 'auth/popup-closed-by-user') return;

    // Mostramos el código de error real para diagnosticar
    const errorCode = error.code || 'Desconocido';
    const errorMsg = error.message || 'Error sin mensaje';

    this.errorMessage = `Error (${errorCode}): ${errorMsg}`;

    // Ayuda específica según el código
    if (errorCode === 'auth/network-request-failed') {
      this.errorMessage = 'Error de red: El APK no tiene acceso a internet o el servidor está bloqueado.';
    } else if (errorCode === 'auth/invalid-api-key') {
      this.errorMessage = 'La API Key de Firebase es inválida o no está configurada para este APK.';
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
