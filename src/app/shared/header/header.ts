import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {environment} from '@environments/environment';


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

  env= environment;

  menuOptions:MenuOption[] = [
    {
      titulo:'Inicio',
      ruta:'/home',
    },
    {
      titulo:'Explorar Islas',
      ruta:'/islas',
    },
    {
      titulo:'Acerca de',
      ruta:'/about',
    },
  ]
  menuOptionsButton:MenuOptionButton[] = [
    {
      titulo:'🔐 Login',
      ruta:'/login',
    }
  ]
}
