import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Observable} from 'rxjs';
import type {LoginRequestType, LoginResponseType} from '../type/UsuarioType';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);
  apiUrl = environment.API_URL + '/login';


  login(loginRequest: LoginRequestType): Observable<LoginResponseType> {
    return this.http.post<LoginResponseType>(this.apiUrl, loginRequest);
  }
}
