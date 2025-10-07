import {Component, input} from '@angular/core';
import {GridIsla} from './grid-isla/grid-isla';
import {Isla} from '../../../type/Isla';


@Component({
  selector: 'app-home-seccion',
  imports: [
    GridIsla
  ],
  templateUrl: './home-seccion.html',
  styleUrl: './home-seccion.css'
})
export class HomeSeccion {
  ListaIslas= input.required<Isla[]>();
}
