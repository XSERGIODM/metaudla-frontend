import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import type {Isla} from '../type/Isla';


@Injectable({
  providedIn: 'root'
})


export class IslaService {

  http= inject(HttpClient);
  islas= signal<Isla[]>([]);
  islaCarga= signal<boolean>(true);

  constructor() {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.http.get<Isla[]>('http://localhost:8080/api/prueba/listar/isla')
      .subscribe((respuesta)=>{
        this.islas.set(respuesta)
        this.islaCarga.set(false);
        console.log(this.islas());
        }
      )
  }

  // Método que devuelve solo las primeras 3 islas
  obtenerTresIslas(): Isla[] {
    return this.islas().slice(0, 3);
  }
}
