import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Observable} from 'rxjs';
import type {UsuarioCreateType, UsuarioResponseType} from '../type/UsuarioType';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  http=inject(HttpClient);
  apiUrl=environment.API_URL+"/usuario";



  crearUsuario(usuario:UsuarioCreateType) : Observable<UsuarioResponseType>{
    return this.http.post<UsuarioResponseType>(this.apiUrl, usuario);
  }
}
