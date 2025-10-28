// Reemplazar el contenido de metaudla-frontend/src/app/service/isla-service.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Isla, IslaDtoCreate } from '../type/Isla';
import { environment } from '@environments/environment';
import { Paginacion } from '../type/Paginacion';

@Injectable({
  providedIn: 'root'
})
export class IslaService {
  private http = inject(HttpClient);
  private api = environment.API_URL + "/isla";

  // Listar todas las islas paginadas
  listarIslas(pagina: number, tamanio: number): Observable<Paginacion<Isla>> {
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamanio', tamanio.toString());
    return this.http.get<Paginacion<Isla>>(`${this.api}/paginadas`, { params });
  }

  // Islas tendencias paginadas
  islasTendencias(pagina: number, tamanio: number): Observable<Paginacion<Isla>> {
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamanio', tamanio.toString());
    return this.http.get<Paginacion<Isla>>(`${this.api}/tendencias`, { params });
  }

  // Obtener isla por ID
  obtenerIsla(id: string): Observable<Isla> {
    return this.http.get<Isla>(`${this.api}/${id}`);
  }

  // Obtener islas del usuario actual (mis islas)
  obtenerMisIslas(autorId: number): Observable<Isla[]> {
    return this.http.get<Isla[]>(`${this.api}/autor/${autorId}`);
  }

  // Crear nueva isla
  crearIsla(islaDto: IslaDtoCreate): Observable<Isla> {
    return this.http.post<Isla>(this.api, islaDto);
  }

  // Actualizar isla
  actualizarIsla(id: number, islaDto: IslaDtoCreate): Observable<Isla> {
    return this.http.put<Isla>(`${this.api}/${id}`, islaDto);
  }

  // Eliminar isla
  eliminarIsla(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
