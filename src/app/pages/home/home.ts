import {Component, inject, OnInit, signal} from '@angular/core';
import {IslaService} from '../../service/isla-service';
import {HomeHero} from './home-hero/home-hero';
import {HomeSeccion} from './home-seccion/home-seccion';
import {Paginacion} from '../../type/Paginacion';
import {Isla} from '../../type/Isla';

@Component({
  selector: 'app-home',
  imports: [
    HomeHero,
    HomeSeccion
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home implements OnInit {
  islaService= inject(IslaService);
  listaTendencia = signal<Isla[]>([]);

  obtenerLista(){
    this.islaService.islasTendencias(0,3).subscribe((lista: Paginacion<Isla>) => {
      this.listaTendencia.set(lista.content);
    });
  }

  ngOnInit(): void {
    this.obtenerLista();
  }
}
