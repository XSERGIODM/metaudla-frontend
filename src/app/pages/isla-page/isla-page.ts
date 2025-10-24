import {Component, inject, OnInit, signal} from '@angular/core';
import {HeaderSeccionIslaPage} from './header-seccion-isla-page/header-seccion-isla-page';
import {FilterSeccionIslaPage} from './filter-seccion-isla-page/filter-seccion-isla-page';
import {IslaService} from '../../service/isla-service';
import {GridIsla} from '../../shared/grid-isla/grid-isla';
import {Paginacion} from '../../type/Paginacion';
import {Isla} from '../../type/Isla';

@Component({
  selector: 'app-isla-page',
  imports: [
    HeaderSeccionIslaPage,
    FilterSeccionIslaPage,
    GridIsla
  ],
  templateUrl: './isla-page.html',
  styleUrl: './isla-page.css'
})
export default class IslaPage implements OnInit{
  ngOnInit(): void {
      this.obtenerLista();
  }
  islaService= inject(IslaService);

  lista = signal<Isla[]>([]);

  obtenerLista(){
    this.islaService.islasTendencias(1,3).subscribe((lista: Paginacion<Isla>) => {
      this.lista.set(lista.content);
    });
  }

}
