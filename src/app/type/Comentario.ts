export interface ComentarioDtoCreate {
  contenido: string;
  islaId: number;
  comentarioPadreId?: number; // Opcional para respuestas anidadas
}

export interface ComentarioDtoResponse {
  id: number;
  contenido: string;
  fechaCreacion: string; // ISO string
  estadoModeracion: EstadoModeracion;
  fechaModeracion?: string; // ISO string, opcional
  usuarioId: number;
  usuarioNombre: string;
  usuarioUsername: string;
  islaId: number;
  islaNombre: string;
  comentarioPadreId?: number; // Opcional para respuestas
  respuestas?: ComentarioDtoResponse[]; // Respuestas anidadas
  likesCount: number;
  dislikesCount: number;
  userLikeType?: TipoLike | null; // ME_GUSTA, NO_ME_GUSTA o null
}

export interface LikeComentarioDto {
  id: number;
  tipo: TipoLike;
  fechaCreacion: string; // ISO string
  usuarioId: number;
  usuarioNombre: string;
  comentarioId: number;
}

export enum TipoLike {
  ME_GUSTA = 'ME_GUSTA',
  NO_ME_GUSTA = 'NO_ME_GUSTA'
}

export enum EstadoModeracion {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO'
}
