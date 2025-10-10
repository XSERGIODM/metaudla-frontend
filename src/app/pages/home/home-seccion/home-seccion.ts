import {Component, input, signal, OnInit} from '@angular/core';
import {GridIsla} from '../../../shared/grid-isla/grid-isla';
import {Isla} from '../../../type/Isla';
import {Paginacion} from '../../../type/Paginacion';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-home-seccion',
  imports: [
    GridIsla
  ],
  templateUrl: './home-seccion.html',
  styleUrl: './home-seccion.css'
})
export class HomeSeccion {
  ListaIslas = input.required<Isla[]>();
}
