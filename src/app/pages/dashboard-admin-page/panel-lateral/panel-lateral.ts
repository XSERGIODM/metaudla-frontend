import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-panel-lateral',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './panel-lateral.html',
  styleUrl: './panel-lateral.css'
})
export class PanelLateral {


  menuItems = [
    {title: 'Usuarios', icon: '🙎‍♂️', link: 'gestion-usuario'},
    {title: 'Islas', icon: '🏝️', link: 'gestion-isla'},
    {title: 'Categoria', icon: '🏷', link: 'gestion-categoria'},
    {title: 'Logs', icon: '📋', link: 'logs-actividades'},
  ];
}
