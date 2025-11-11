import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeGustaFavoritoService {
  private http = inject(HttpClient);
  private api = environment.API_URL + "/interacciones";

  // Agregar me gusta a una isla
  agregarMeGusta(islaId: string): Observable<string> {
    return this.http.post(`${this.api}/isla/${islaId}/like`, {}, { responseType: 'text' });
  }

  // Quitar me gusta de una isla
  quitarMeGusta(islaId: string): Observable<string> {
    return this.http.delete(`${this.api}/isla/${islaId}/like`, { responseType: 'text' });
  }

  // Agregar isla a favoritos
  agregarFavorito(islaId: string): Observable<string> {
    return this.http.post(`${this.api}/isla/${islaId}/favorito`, {}, { responseType: 'text' });
  }

  // Quitar isla de favoritos
  quitarFavorito(islaId: string): Observable<string> {
    return this.http.delete(`${this.api}/isla/${islaId}/favorito`, { responseType: 'text' });
  }

  // Verificar si el usuario ha dado me gusta a una isla
  verificarMeGusta(islaId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.api}/isla/${islaId}/like/status`);
  }

  // Verificar si la isla está en favoritos del usuario
  verificarFavorito(islaId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.api}/isla/${islaId}/favorito/status`);
  }

  // Obtener la puntuación del usuario para una isla
  obtenerPuntuacionUsuario(islaId: string): Observable<number> {
    return this.http.get<number>(`${this.api}/isla/${islaId}/puntuacion`);
  }

  // Establecer puntuación para una isla
  establecerPuntuacion(islaId: string, calificacion: number): Observable<string> {
    return this.http.post(`${this.api}/isla/${islaId}/puntuacion`, {}, {
      params: { calificacion: calificacion.toString() },
      responseType: 'text'
    });
  }

  // Obtener el promedio de puntuaciones para una isla
  obtenerPromedioPuntuaciones(islaId: string): Observable<number> {
    return this.http.get<number>(`${this.api}/isla/${islaId}/puntuacion/promedio`);
  }
}
