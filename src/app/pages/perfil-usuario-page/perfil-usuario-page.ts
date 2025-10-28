import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-perfil-usuario-page',
  imports: [RouterLink],
  templateUrl: './perfil-usuario-page.html',
  styleUrl: './perfil-usuario-page.css'
})
export default class PerfilUsuarioPage {
  private authService = inject(AuthService);

  // Signal computado para obtener el usuario actual
  usuario = computed(() => this.authService.currentUser());

  // Formatear fecha de creación
  formatDate(date: Date | undefined): string {
    if (!date) return 'Fecha no disponible';

    const d = new Date(date);
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  // Obtener ruta del dashboard según el rol
  getDashboardRoute(): string {
    const user = this.usuario();
    if (user?.rol === 'ADMINISTRADOR') {
      return '/dashboard-admin';
    } else if (user?.rol === 'PROFESOR') {
      return '/dashboard-profesor';
    }
    return '/';
  }
  // En perfil-usuario-page.ts, agregar este método:
  getInitial(): string {
    const nombre = this.usuario()?.nombre;
    return nombre && nombre.length > 0 ? nombre.charAt(0).toUpperCase() : '?';
  }
}
