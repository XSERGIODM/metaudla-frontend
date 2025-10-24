import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {UsuarioService} from '../../../service/usuario-service';
import {Router} from '@angular/router';
import type {UsuarioCreateType} from '../../../type/UsuarioType';

@Component({
  selector: 'app-registro-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-form.html',
  styleUrl: './registro-form.css'
})
export class RegistroForm {

  usuarioService = inject(UsuarioService);

  router = inject(Router);

  // Datos del formulario
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  aceptarTerminos: boolean = false;

  // Estados del formulario
  mensajeError: string = '';
  mensajeExito: string = '';
  enviando: boolean = false;



  onSubmit(): void {
    // Resetear mensajes
    this.mensajeError = '';
    this.mensajeExito = '';

    // Validaciones
    if (!this.validarFormulario()) {
      return;
    }

    // Crear el usuario para enviar al backend
    const usuarioCreate: UsuarioCreateType = {
      nombre: `${this.nombre} ${this.apellido}`,
      username: this.correo.split('@')[0], // Usar parte del email como username
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.enviando = true;
    console.log('Enviando usuario:', usuarioCreate);

    this.usuarioService.crearUsuario(usuarioCreate).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente:', response);
        this.mensajeExito = 'Cuenta creada exitosamente. Redirigiendo al login...';
        this.enviando = false;

        // Limpiar formulario
        this.limpiarFormulario();

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        this.mensajeError = error.error?.message || 'Error al crear la cuenta. Por favor, intenta de nuevo.';
        this.enviando = false;
      }
    });
  }

  private validarFormulario(): boolean {
    // Validar campos vacíos
    if (!this.nombre.trim()) {
      this.mensajeError = 'El nombre es requerido';
      return false;
    }

    if (!this.apellido.trim()) {
      this.mensajeError = 'El apellido es requerido';
      return false;
    }

    if (!this.correo.trim()) {
      this.mensajeError = 'El correo electrónico es requerido';
      return false;
    }

    // Validar formato de email UDLA
    const emailRegex = /^[a-zA-Z0-9._-]+@udla\.edu\.co$/;
    if (!emailRegex.test(this.correo)) {
      this.mensajeError = 'Debes usar un correo institucional (@udla.edu.ec)';
      return false;
    }

    if (!this.contrasena) {
      this.mensajeError = 'La contraseña es requerida';
      return false;
    }

    // Validar requisitos de contraseña (según backend)
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if (!passwordRegex.test(this.contrasena)) {
      this.mensajeError = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@#$%^&+=)';
      return false;
    }

    // Validar que las contraseñas coincidan
    if (this.contrasena !== this.confirmarContrasena) {
      this.mensajeError = 'Las contraseñas no coinciden';
      return false;
    }

    // Validar términos y condiciones
    if (!this.aceptarTerminos) {
      this.mensajeError = 'Debes aceptar los términos y condiciones';
      return false;
    }

    return true;
  }

  private limpiarFormulario(): void {
    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.contrasena = '';
    this.confirmarContrasena = '';
    this.aceptarTerminos = false;
  }
}
