import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {environment} from '@environments/environment';
import {AuthService} from '../../service/auth-service';


interface MenuOption{
  titulo:string,
  ruta:string,
}
interface MenuOptionButton{
  titulo:string,
  ruta:string,
}


@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  authService = inject(AuthService);
  env = environment;

  menuOptions: MenuOption[] = [
    {
      titulo: 'Inicio',
      ruta: '/home',
    },
    {
      titulo: 'Explorar Islas',
      ruta: '/islas',
    },
    {
      titulo: 'Acerca de',
      ruta: '/about',
    },
  ]

  getDashboardRoute(): string {
    const user = this.authService.currentUser();
    if (user?.rol === 'ADMINISTRADOR') {
      return '/dashboard-admin'; // O podrías devolver '/mis-islas' si quieres un default
    } else if (user?.rol === 'PROFESOR') {
      return '/mis-islas';
    } else {
      return '/'; // Para estudiantes u otros roles
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
