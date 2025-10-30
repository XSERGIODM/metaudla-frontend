import {Component, inject, OnInit, signal} from '@angular/core';
import {IslaService} from '../../service/isla-service';
import {HomeHero} from './home-hero/home-hero';
import {HomeSeccion} from './home-seccion/home-seccion';
import {Paginacion} from '../../type/Paginacion';
import {Isla} from '../../type/Isla';
import {Loader} from '../../shared/loader/loader';

@Component({
  selector: 'app-home',
  imports: [
    HomeHero,
    HomeSeccion,
    Loader
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home implements OnInit {
  islaService= inject(IslaService);
  listaTendencia = signal<Isla[]>([]);
  isLoading = signal<boolean>(true);

  obtenerLista(){
    this.isLoading.set(true);
    this.islaService.islasTendencias(0,3).subscribe((lista: Paginacion<Isla>) => {
      this.listaTendencia.set(lista.content);
      this.isLoading.set(false);
    });
  }

  ngOnInit(): void {
    this.obtenerLista();
  }
}
