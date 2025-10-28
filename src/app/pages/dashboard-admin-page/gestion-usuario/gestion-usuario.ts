import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {UsuarioService} from '../../../service/usuario-service';
import type {Paginacion} from '../../../type/Paginacion';
import type {UsuarioResponseType, UsuarioType} from '../../../type/UsuarioType';
import {DatePipe} from '@angular/common';
import {User} from '../../../type/User';
import GestionUsuarioModal from './gestion-usuario-modal';

@Component({
  selector: 'app-gestion-usuario',
  imports: [
    DatePipe,
    GestionUsuarioModal
  ],
  templateUrl: './gestion-usuario.html',
  styleUrl: './gestion-usuario.css'
})
export default class GestionUsuario implements OnInit {

  usuarioService = inject(UsuarioService);
  usuarios = signal<User>(
    {
      page: {
        number: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
      },
      content: []
    }
  );
  paginaActual = signal(0);
  tamanioPagina = signal(10);
  paginasTotales = computed(() => this.usuarios()?.page.totalPages ?? 0);
  arrayPaginas = computed(() => Array.from({ length: this.paginasTotales() }, (_, i) => i));
  isModalOpen = signal(false);
  usuarioSeleccionado = signal<UsuarioType | null>(null);

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuarioService.listarUsuarios(this.paginaActual(), this.tamanioPagina()).subscribe((data) => {
      this.usuarios.set(data);
    });
  }

  siguientePagina(): void {
    if (this.paginaActual() < this.paginasTotales() - 1) {
      this.paginaActual.update(pagina => pagina + 1);
      this.listarUsuarios();
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual() > 0) {
      this.paginaActual.update(pagina => pagina - 1);
      this.listarUsuarios();
    }
  }

  irAPagina(pagina: number): void {
    this.paginaActual.set(pagina);
    this.listarUsuarios();
  }

  abrirModal(usuario?: UsuarioType): void {
    this.usuarioSeleccionado.set(usuario || null);
    this.isModalOpen.set(true);
  }

  cerrarModal(): void {
    this.isModalOpen.set(false);
    this.usuarioSeleccionado.set(null);
  }

  onUsuarioGuardado(): void {
    this.listarUsuarios();
  }

  deshabilitarUsuario(id: number): void {
    this.usuarioService.deshabilitarUsuario(id).subscribe(() => {
      this.listarUsuarios();
    });
  }

  habilitarUsuario(id: number): void {
    this.usuarioService.habilitarUsuario(id).subscribe(() => {
      this.listarUsuarios();
    });
  }
}
