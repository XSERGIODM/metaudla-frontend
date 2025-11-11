import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auditoria, AuditoriaResponse } from '../type/Auditoria';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  private http = inject(HttpClient);
  private apiUrl = environment.API_URL + '/auditoria';

  getAuditoriasRecientes(limit: number = 10): Observable<Auditoria[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<Auditoria[]>(`${this.apiUrl}/recientes`, { params });
  }

  getAuditorias(page: number = 0, size: number = 10, sortBy: string = 'timestamp', sortDir: string = 'desc',
                filters?: { usuarioNombre?: string; endpoint?: string; metodoHttp?: string; codigoRespuesta?: number;
                          exito?: boolean; fechaDesde?: string; fechaHasta?: string; busqueda?: string }): Observable<AuditoriaResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    if (filters) {
      if (filters.usuarioNombre) params = params.set('usuarioNombre', filters.usuarioNombre);
      if (filters.endpoint) params = params.set('endpoint', filters.endpoint);
      if (filters.metodoHttp) params = params.set('metodoHttp', filters.metodoHttp);
      if (filters.codigoRespuesta !== undefined) params = params.set('codigoRespuesta', filters.codigoRespuesta.toString());
      if (filters.exito !== undefined) params = params.set('exito', filters.exito.toString());
      if (filters.fechaDesde) params = params.set('fechaDesde', filters.fechaDesde);
      if (filters.fechaHasta) params = params.set('fechaHasta', filters.fechaHasta);
      if (filters.busqueda) params = params.set('busqueda', filters.busqueda);
    }

    return this.http.get<AuditoriaResponse>(this.apiUrl, { params });
  }
}
