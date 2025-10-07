import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-form',
  imports: [CommonModule],
  templateUrl: './registro-form.html',
  styleUrl: './registro-form.css'
})
export class RegistroForm {
  onSubmit(): void {
    // Lógica para manejar el envío del formulario de registro
    console.log('Formulario de registro enviado');
  }
}
