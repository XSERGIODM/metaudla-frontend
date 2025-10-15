import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import type {Isla} from '../type/Isla';
import {environment} from '@environments/environment';
import {Paginacion} from '../type/Paginacion';


@Injectable({
  providedIn: 'root'
})


export class IslaService {

  http = inject(HttpClient);

  api = environment.API_URL + "/isla";

  listaTendencia = signal<Isla[]>([]);
  lista = signal<Isla[]>([]);
  islaCarga = signal<boolean>(true);



  constructor() {
    this.llenarListaTendencia();
    this.llenarLista();
  }

  listarIslas(pagina: number, tamanio: number): Observable<Paginacion<Isla>> {
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamanio', tamanio.toString());
    return this.http.get<Paginacion<Isla>>(`${this.api}/paginadas`, {params});
  }

  //Islas tendencias paginadas
  islasTendencias(pagina: number, tamanio: number): Observable<Paginacion<Isla>> {
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamanio', tamanio.toString());
    this.islaCarga.set(true);
    return this.http.get<Paginacion<Isla>>(this.api+"/tendencias", {params});
  }

  llenarListaTendencia() {
    this.islasTendencias(0, 3).subscribe((lista: Paginacion<Isla>) => {
      this.islaCarga.set(false);
      this.listaTendencia.set(lista.content);
    });
  }

  llenarLista() {
    this.listarIslas(0, 20).subscribe((lista: Paginacion<Isla>) => {
      this.islaCarga.set(false);
      this.lista.set(lista.content);
    });
  }

  obtenerIsla(id: string){
    return this.http.get<Isla>(`${this.api}/${id}`).pipe(
      map((isla: Isla) => {
        return isla;
      })
    );
  }


}
