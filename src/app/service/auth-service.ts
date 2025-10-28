import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import type { LoginResponseType, UsuarioType } from '../type/UsuarioType';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // Signals para el estado de autenticación
  private tokenSignal = signal<string | null>(this.getStoredToken());
  private usuarioSignal = signal<UsuarioType | null>(this.getStoredUser());

  // Computed para verificar si está autenticado
  isAuthenticated = computed(() => !!this.tokenSignal());
  currentUser = computed(() => this.usuarioSignal());

  constructor(private router: Router) {}

  // Guardar datos de login
  setLoginData(loginResponse: LoginResponseType): void {
    localStorage.setItem(this.TOKEN_KEY, loginResponse.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(loginResponse.usuario));
    this.tokenSignal.set(loginResponse.token);
    this.usuarioSignal.set(loginResponse.usuario);
  }

  // Obtener token
  getToken(): string | null {
    return this.tokenSignal();
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.tokenSignal.set(null);
    this.usuarioSignal.set(null);
    this.router.navigate(['/login']);
  }

  // Obtener token del storage
  private getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Obtener usuario del storage
  private getStoredUser(): UsuarioType | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
}
