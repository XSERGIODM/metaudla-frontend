import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../../../service/login-service';
import {LoginRequestType} from '../../../type/UsuarioType';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {

  loginService = inject(LoginService);

  mensajeError = signal<string>('');
  mensajeExito = signal<string>('');
  enviando = signal<boolean>(false);

  loginRequest= signal<LoginRequestType>({
    usernameOrEmail: '',
    contrasena: ''
  });


  onSubmit(): void {
    console.log('Formulario de login enviado');
    console.log('Login enviado: ' + this.loginRequest().usernameOrEmail + ' --- ' + this.loginRequest().contrasena);
    this.enviando.set(true);
    if (!this.validarFormulario()) {
      return;
    }
    this.loginService.login(this.loginRequest()).subscribe({
      next: (response) => {
        this.enviando.set(false);
        this.mensajeExito.set('Login exitoso: ' + response.token);
        console.log('Login exitoso: ' + response);
        setTimeout(() => {
          this.limpiarFormulario();
        }, 2000);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.mensajeError.set('Error al iniciar sesión: ' + error.error?.message);
        this.enviando.set(false);
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
    this.enviando.set(false);
  }
}
