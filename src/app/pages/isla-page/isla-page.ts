import {Component, inject, OnInit, signal} from '@angular/core';
import {HeaderSeccionIslaPage} from './header-seccion-isla-page/header-seccion-isla-page';
import {FilterSeccionIslaPage} from './filter-seccion-isla-page/filter-seccion-isla-page';
import {IslaService} from '../../service/isla-service';
import {GridIsla} from '../../shared/grid-isla/grid-isla';
import {Paginacion} from '../../type/Paginacion';
import {Isla} from '../../type/Isla';
import {Loader} from '../../shared/loader/loader';

@Component({
  selector: 'app-isla-page',
  imports: [
    HeaderSeccionIslaPage,
    FilterSeccionIslaPage,
    GridIsla,
    Loader
  ],
  templateUrl: './isla-page.html',
  styleUrl: './isla-page.css'
})
export default class IslaPage implements OnInit{

  islaService= inject(IslaService);
  isLoading = signal<boolean>(true);

  lista = signal<Isla[]>([]);

  obtenerLista(){
    this.isLoading = signal<boolean>(true);
    this.islaService.listarIslas().subscribe((lista: Isla[]) => {
      this.lista.set(lista);
      this.isLoading = signal<boolean>(false);
    });
  }

  ngOnInit(): void {
    this.obtenerLista();
  }

}
