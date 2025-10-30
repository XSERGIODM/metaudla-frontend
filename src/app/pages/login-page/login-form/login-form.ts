import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../../../service/login-service';
import {LoginRequestType} from '../../../type/UsuarioType';
import {AuthService} from '../../../service/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {

  loginService = inject(LoginService);
  authService = inject(AuthService);
  router = inject(Router);


  mensajeError = signal<string>('');
  mensajeExito = signal<string>('');
  enviandoAndLoding = signal<boolean>(false);

  loginRequest = signal<LoginRequestType>({
    usernameOrEmail: '',
    contrasena: ''
  });

  onSubmit(): void {
    console.log('Formulario de login enviado');
    this.enviandoAndLoding.set(true);

    if (!this.validarFormulario()) {
      this.enviandoAndLoding.set(false);
      return;
    }

    this.loginService.login(this.loginRequest()).subscribe({
      next: (response) => {
        // Guardar datos de autenticación
        this.authService.setLoginData(response);

        this.enviandoAndLoding.set(false);
        this.mensajeExito.set('Login exitoso');
        console.log('Login exitoso, usuario:', response.usuario.nombre);
        this.limpiarFormulario();
        // Redirigir según el rol
        setTimeout(() => {
          if (response.usuario.rol === 'ADMINISTRADOR') {
            this.router.navigate(['/dashboard-admin']);
          } else {
            this.router.navigate(['/dashboard-usuario']);
          }
        }, 1000);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.mensajeError.set('Error al iniciar sesión: ' + (error.error?.message || 'Credenciales inválidas'));
        this.enviandoAndLoding.set(false);
      }
    });
  }

  private validarFormulario(): boolean {
    if (!this.loginRequest().usernameOrEmail.trim()){
      this.mensajeError.set('El usuario o correo electrónico es requerido');
      return false;
    }
    if (!this.loginRequest().contrasena.trim()){
      this.mensajeError.set('La contraseña es requerida');
      return false;
    }
    return true;
  }

  private limpiarFormulario(): void {
    this.loginRequest.set({
      usernameOrEmail: '',
      contrasena: ''
    });
    this.mensajeError.set('');
    this.mensajeExito.set('');
    this.enviandoAndLoding.set(false);
  }
}
