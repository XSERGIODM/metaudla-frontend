import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from './login-form/login-form';
import { RegistroForm } from './registro-form/registro-form';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    LoginForm,
    RegistroForm
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

  env= environment;

  // Signal para controlar qué formulario mostrar (true = login, false = registro)
  formularioLoginRegistro = signal<boolean>(true);

  // Computed signals para facilitar el uso en el template
  modoActual = computed(() =>
    this.formularioLoginRegistro() ? 'login' : 'registro'
  );

  tituloFormulario = computed(() =>
    this.formularioLoginRegistro() ? 'Bienvenido de vuelta' : 'Únete al Metaverso'
  );

  iconoModo = computed(() =>
    this.formularioLoginRegistro() ? '🔐' : '⚡'
  );

  /**
   * Método para cambiar entre formularios de login y registro
   */
  cambiarFormulario(): void {
    this.formularioLoginRegistro.set(!this.formularioLoginRegistro());
  }

  /**
   * Método para verificar si el formulario actual es de login
   * @returns boolean indicando si mostrar formulario de login
   */
  esFormularioLogin(): boolean {
    return this.formularioLoginRegistro();
  }

  /**
   * Método para verificar si el formulario actual es de registro
   * @returns boolean indicando si mostrar formulario de registro
   */
  esFormularioRegistro(): boolean {
    return !this.formularioLoginRegistro();
  }

  /**
   * Método para establecer directamente el modo login
   */
  mostrarLogin(): void {
    this.formularioLoginRegistro.set(true);
  }

  /**
   * Método para establecer directamente el modo registro
   */
  mostrarRegistro(): void {
    this.formularioLoginRegistro.set(false);
  }

  /**
   * Método para obtener estadísticas del metaverso (datos simulados)
   */
  getEstadisticasMetaverso() {
    return {
      islasDisponibles: 47,
      usuariosActivos: 12500,
      usuariosEnLinea: 156,
      satisfaccion: 98
    };
  }
}
