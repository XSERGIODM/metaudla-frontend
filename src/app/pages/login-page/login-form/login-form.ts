import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  onSubmit(): void {
    // Lógica para manejar el envío del formulario de login
    console.log('Formulario de login enviado');
  }
}
