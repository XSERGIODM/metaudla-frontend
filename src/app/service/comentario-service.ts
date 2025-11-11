import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import type {
  ComentarioDtoCreate,
  ComentarioDtoResponse,
  LikeComentarioDto,
  TipoLike,
  EstadoModeracion
} from '../type/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private http = inject(HttpClient);
  private api = environment.API_URL + "/comentario";

  // ========== CRUD BÁSICO DE COMENTARIOS ==========

  // Crear comentario
  crearComentario(comentarioDto: ComentarioDtoCreate): Observable<ComentarioDtoResponse> {
    return this.http.post<ComentarioDtoResponse>(this.api, comentarioDto);
  }

  // Actualizar comentario
  actualizarComentario(id: number, comentarioDto: ComentarioDtoCreate): Observable<ComentarioDtoResponse> {
    return this.http.put<ComentarioDtoResponse>(`${this.api}/${id}`, comentarioDto);
  }

  // Eliminar comentario
  eliminarComentario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  // Obtener comentario por ID
  obtenerComentario(id: number): Observable<ComentarioDtoResponse> {
    return this.http.get<ComentarioDtoResponse>(`${this.api}/${id}`);
  }

  // ========== LISTADO DE COMENTARIOS ==========

  // Obtener comentarios por isla
  obtenerComentariosPorIsla(islaId: number): Observable<ComentarioDtoResponse[]> {
    return this.http.get<ComentarioDtoResponse[]>(`${this.api}/isla/${islaId}`);
  }

  // Obtener comentarios por isla paginados
  obtenerComentariosPorIslaPaginados(
    islaId: number,
    pagina: number = 0,
    tamanio: number = 10
  ): Observable<any> { // Usar any por ahora, luego definir tipo de paginación
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamanio', tamanio.toString());
    return this.http.get(`${this.api}/isla/${islaId}/paginados`, { params });
  }

  // Obtener comentarios por usuario
  obtenerComentariosPorUsuario(usuarioId: number): Observable<ComentarioDtoResponse[]> {
    return this.http.get<ComentarioDtoResponse[]>(`${this.api}/usuario/${usuarioId}`);
  }

  // ========== SISTEMA DE LIKES ==========

  // Agregar like a comentario
  agregarLikeComentario(comentarioId: number, tipo: TipoLike): Observable<string> {
    const params = new HttpParams().set('tipo', tipo);
    return this.http.post<string>(`${this.api}/${comentarioId}/like`, null, { params });
  }

  // Quitar like de comentario
  quitarLikeComentario(comentarioId: number): Observable<string> {
    return this.http.delete<string>(`${this.api}/${comentarioId}/like`);
  }

  // Verificar like del usuario actual
  verificarLikeUsuario(comentarioId: number): Observable<string> {
    return this.http.get<string>(`${this.api}/${comentarioId}/like/status`);
  }

  // ========== MODERACIÓN ==========

  // Moderar comentario
  moderarComentario(comentarioId: number, estado: EstadoModeracion): Observable<string> {
    const params = new HttpParams().set('estado', estado);
    return this.http.put<string>(`${this.api}/${comentarioId}/moderacion`, null, { params });
  }

  // Obtener comentarios pendientes de moderación
  obtenerComentariosPendientesModeracion(): Observable<ComentarioDtoResponse[]> {
    return this.http.get<ComentarioDtoResponse[]>(`${this.api}/moderacion/pendientes`);
  }

  // ========== ESTADÍSTICAS ==========

  // Contar comentarios por isla
  contarComentariosPorIsla(islaId: number): Observable<number> {
    return this.http.get<number>(`${this.api}/isla/${islaId}/count`);
  }

  // ========== RESPUESTAS ANIDADAS ==========

  // Crear respuesta a comentario
  crearRespuesta(comentarioPadreId: number, respuestaDto: ComentarioDtoCreate): Observable<ComentarioDtoResponse> {
    return this.http.post<ComentarioDtoResponse>(`${this.api}/${comentarioPadreId}/respuesta`, respuestaDto);
  }

  // Obtener respuestas de un comentario
  obtenerRespuestasComentario(comentarioPadreId: number): Observable<ComentarioDtoResponse[]> {
    return this.http.get<ComentarioDtoResponse[]>(`${this.api}/${comentarioPadreId}/respuestas`);
  }
}
