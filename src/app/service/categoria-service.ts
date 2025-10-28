import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Observable} from 'rxjs';
import {CategoriaPegableType} from '../type/CategoriaPegableType';
import {CategoriaType} from '../type/CategoriaType';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  http=inject(HttpClient);
  apiUrl=environment.API_URL+"/categorias";

  listarCategorias(pagina:number, tamanio:number): Observable<CategoriaPegableType>{
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamanio', tamanio.toString());
    return this.http.get<CategoriaPegableType>(`${this.apiUrl}`, { params });
  }

  crearCategoria(categoria: Omit<CategoriaType, 'id'>): Observable<CategoriaType> {
    return this.http.post<CategoriaType>(`${this.apiUrl}`, categoria);
  }

  actualizarCategoria(categoria: CategoriaType): Observable<CategoriaType> {
    return this.http.put<CategoriaType>(`${this.apiUrl}`, categoria);
  }

  deshabilitarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  habilitarCategoria(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, {});
  }
}
