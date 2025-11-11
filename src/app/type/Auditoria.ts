export interface Auditoria {
  id: number;
  usuarioNombre: string;
  endpoint: string;
  metodoHttp: string;
  timestamp: string;
  codigoRespuesta: number;
  exito: boolean;
  mensajeError?: string;
}

export interface AuditoriaResponse {
  content: Auditoria[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
