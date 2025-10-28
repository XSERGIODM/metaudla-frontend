import { Component } from '@angular/core';
import {HeaderSeccion} from './header-seccion/header-seccion';
import {EstadisticaGlobales} from './estadistica-globales/estadistica-globales';
import {RouterOutlet} from '@angular/router';
import {RouterLink} from '@angular/router';
import {PanelLateral} from './panel-lateral/panel-lateral';


@Component({
  selector: 'app-dashboard-admin-page',
  imports: [
    HeaderSeccion,
    EstadisticaGlobales,
    RouterOutlet,
    PanelLateral
  ],
  templateUrl: './dashboard-admin-page.html',
  styleUrl: './dashboard-admin-page.css'
})
export default class DashboardAdminPage {



}
