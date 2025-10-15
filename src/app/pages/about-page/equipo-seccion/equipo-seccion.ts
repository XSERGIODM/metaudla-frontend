import {Component} from '@angular/core';
import {environment} from '@environments/environment';
import {CardEquipo} from './card-equipo/card-equipo';
import type {Miembro} from '../../../type/Miembro';

@Component({
    selector: 'app-equipo-seccion',
  imports: [
    CardEquipo
  ],
    templateUrl: './equipo-seccion.html',
    styleUrl: './equipo-seccion.css'
})
export class EquipoSeccion {
  listaEquipo: Miembro[] = [
    {
      imagen: environment.FOTO_SERGIO,
      nombre: 'Sergio Danilo Mosquera Quigua',
      descripcion: 'Ingeniero de Sistemas y Desarrollador Principal',
      informacion: 'Experto en desarrollo de experiencias inmersivas y optimización de motores gráficos para aplicaciones educativas.'
    },
    {
      imagen: environment.FOTO_MILLAN,
      nombre: 'Edwin Millan',
      descripcion: 'Director de Proyecto',
      informacion: 'Líder del proyecto con más de 10 años de experiencia en desarrollo de software educativo y tecnologías inmersivas.'
    },
  ]
}
