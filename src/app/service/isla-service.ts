import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import type {Isla} from '../type/Isla';
import {environment} from '@environments/environment';
import {Paginacion} from '../type/Paginacion';


@Injectable({
  providedIn: 'root'
})


export class IslaService {

  http = inject(HttpClient);
  api = environment.API_URL + "/isla";

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
    return this.http.get<Paginacion<Isla>>(this.api+"/tendencias", {params});
  }

  obtenerIsla(id: string){
    return this.http.get<Isla>(`${this.api}/${id}`);
  }
}
