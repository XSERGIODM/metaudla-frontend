import { Component } from '@angular/core';
import {HeaderSeccion} from './header-seccion/header-seccion';
import {EstadisticaGlobales} from './estadistica-globales/estadistica-globales';
import {PanelDeControlPrincipal} from './panel-de-control-principal/panel-de-control-principal';

@Component({
  selector: 'app-dashboard-admin-page',
  imports: [
    HeaderSeccion,
    EstadisticaGlobales,
    PanelDeControlPrincipal
  ],
  templateUrl: './dashboard-admin-page.html',
  styleUrl: './dashboard-admin-page.css'
})
export default class DashboardAdminPage {

}
