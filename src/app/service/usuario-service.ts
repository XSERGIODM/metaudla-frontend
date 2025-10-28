import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Observable} from 'rxjs';
import type {UsuarioCreateType, UsuarioResponseType, UsuarioType} from '../type/UsuarioType';
import {Paginacion} from '../type/Paginacion';
import {User} from '../type/User';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  http=inject(HttpClient);
  apiUrl=environment.API_URL+"/usuario";



  crearUsuario(usuario:UsuarioCreateType) : Observable<UsuarioResponseType>{
    return this.http.post<UsuarioResponseType>(this.apiUrl, usuario);
  }

  listarUsuarios(pagina:number, tamanio:number): Observable<User>{
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamanio', tamanio.toString());
    return this.http.get<User>(`${this.apiUrl}`, { params });
  }

  actualizarUsuario(usuario: UsuarioCreateType): Observable<UsuarioResponseType> {
    return this.http.put<UsuarioResponseType>(`${this.apiUrl}`, usuario);
  }

  deshabilitarUsuario(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/deshabilitar`, {});
  }
  habilitarUsuario(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/habilitar`, {});
  }
}
