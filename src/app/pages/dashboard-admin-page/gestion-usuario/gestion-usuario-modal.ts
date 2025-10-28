import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsuarioService} from '../../../service/usuario-service';
import {UsuarioCreateType, UsuarioType} from '../../../type/UsuarioType';

@Component({
  selector: 'app-gestion-usuario-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './gestion-usuario-modal.html',
  styleUrl: './gestion-usuario-modal.css'
})
export default class GestionUsuarioModal implements OnInit {
  @Input() usuario: UsuarioType | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() usuarioGuardado = new EventEmitter<void>();

  formBuilder = inject(FormBuilder);
  usuarioService = inject(UsuarioService);

  formUsuario: FormGroup = this.formBuilder.group({
    id: [null],
    nombre: ['', Validators.required],
    username: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', this.usuario ? [] : Validators.required],
    rol: ['ESTUDIANTE', Validators.required]
  });

  ngOnInit(): void {
    if (this.usuario) {
      this.formUsuario.patchValue({
        id: this.usuario.id,
        nombre: this.usuario.nombre,
        username: this.usuario.username,
        correo: this.usuario.correo,
        rol: this.usuario.rol
      });
      this.formUsuario.get('contrasena')?.clearValidators();
      this.formUsuario.get('contrasena')?.updateValueAndValidity();
    }
  }

  guardarUsuario(): void {
    if (this.formUsuario.invalid) {
      return;
    }

    const usuarioData = this.formUsuario.value;

    if (this.usuario) {
      // Actualizar usuario
      this.usuarioService.actualizarUsuario(usuarioData).subscribe(() => {
        this.usuarioGuardado.emit();
        this.cerrar.emit();
      });
    } else {
      // Crear usuario
      this.usuarioService.crearUsuario(usuarioData).subscribe(() => {
        this.usuarioGuardado.emit();
        this.cerrar.emit();
      });
    }
  }
}
