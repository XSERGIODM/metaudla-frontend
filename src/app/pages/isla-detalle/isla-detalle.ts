import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {IslaService} from '../../service/isla-service';
import {MeGustaFavoritoService} from '../../service/me-gusta-favorito-service';
import {ComentarioService} from '../../service/comentario-service';
import {Isla} from '../../type/Isla';
import {ComentarioDtoResponse, ComentarioDtoCreate, TipoLike} from '../../type/Comentario';
import {Loader} from '../../shared/loader/loader';

@Component({
  selector: 'app-isla-detalle',
  imports: [CommonModule, RouterLink, Loader, FormsModule],
  templateUrl: './isla-detalle.html',
  styleUrl: './isla-detalle.css'
})
export default class IslaDetalle implements OnInit {

  // Exponer el enum TipoLike para usarlo en el template
  TipoLike = TipoLike;

  islaService = inject(IslaService);
  meGustaFavoritoService = inject(MeGustaFavoritoService);
  comentarioService = inject(ComentarioService);
  endpointRoute = inject(ActivatedRoute);
  isLoading = signal(true);
  isla = signal<Isla | null>(null);
  imagenActual = signal<string>('');
  videoActual = signal<string>('');
  isLiked = signal(false);
  isFavorited = signal(false);
  puntuacionUsuario = signal<number | null>(null);
  promedioPuntuaciones = signal<number>(0);

  // Signals para comentarios
  comentarios = signal<ComentarioDtoResponse[]>([]);
  nuevoComentario = signal<string>('');
  isLoadingComentarios = signal(false);
  isSubmittingComentario = signal(false);

  // Signals para respuestas
  comentarioRespondiendoId = signal<number | null>(null);
  nuevaRespuesta = signal<string>('');
  isSubmittingRespuesta = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    const islaId = this.endpointRoute.snapshot.params['key'];
    this.islaService.obtenerIsla(islaId).subscribe((isla: Isla) => {
      this.isla.set(isla);
      this.imagenActual.set(isla.imagenes?.[0] || '');
      this.videoActual.set(isla.videos?.[0] || '');
      this.cargarEstadosInteraccion(islaId, isla);
      this.cargarComentarios(islaId);
      this.isLoading.set(false);
    });
  }

  private cargarEstadosInteraccion(islaId: string, isla: Isla): void {
    this.meGustaFavoritoService.verificarMeGusta(islaId).subscribe((liked: boolean) => {
      this.isLiked.set(liked);
    });
    this.meGustaFavoritoService.verificarFavorito(islaId).subscribe((favorited: boolean) => {
      this.isFavorited.set(favorited);
    });
    this.meGustaFavoritoService.obtenerPuntuacionUsuario(islaId).subscribe({
      next: (puntuacion: number) => {
        this.puntuacionUsuario.set(puntuacion);
      },
      error: () => {
        this.puntuacionUsuario.set(null);
      }
    });
    const promedio = isla.puntuacioneCalificacions.length > 0
      ? isla.puntuacioneCalificacions.reduce((sum, val) => sum + val, 0) / isla.puntuacioneCalificacions.length
      : 0;
    this.promedioPuntuaciones.set(promedio);
  }

  cambiarImagen(imagen: string): void {
    this.imagenActual.set(imagen);
  }

  cambiarVideo(video: string): void {
    this.videoActual.set(video);
  }

  toggleLike(): void {
    const islaId = this.isla()?.id;
    if (!islaId) return;

    if (this.isLiked()) {
      this.meGustaFavoritoService.quitarMeGusta(islaId.toString()).subscribe(() => {
        this.isLiked.set(false);
      });
    } else {
      this.meGustaFavoritoService.agregarMeGusta(islaId.toString()).subscribe(() => {
        this.isLiked.set(true);
      });
    }
  }

  toggleFavorite(): void {
    const islaId = this.isla()?.id;
    if (!islaId) return;

    if (this.isFavorited()) {
      this.meGustaFavoritoService.quitarFavorito(islaId.toString()).subscribe(() => {
        this.isFavorited.set(false);
      });
    } else {
      this.meGustaFavoritoService.agregarFavorito(islaId.toString()).subscribe(() => {
        this.isFavorited.set(true);
      });
    }
  }

  establecerPuntuacion(calificacion: number): void {
    const islaId = this.isla()?.id;
    if (!islaId) return;

    this.meGustaFavoritoService.establecerPuntuacion(islaId.toString(), calificacion).subscribe(() => {
      this.puntuacionUsuario.set(calificacion);
      // Actualizar el promedio después de establecer la puntuación
      this.meGustaFavoritoService.obtenerPromedioPuntuaciones(islaId.toString()).subscribe((promedio: number) => {
        this.promedioPuntuaciones.set(promedio);
      });
    });
  }

  // ========== MÉTODOS PARA COMENTARIOS ==========

  cargarComentarios(islaId: string): void {
    this.isLoadingComentarios.set(true);
    this.comentarioService.obtenerComentariosPorIsla(+islaId).subscribe({
      next: (comentarios: ComentarioDtoResponse[]) => {
        this.comentarios.set(comentarios);
        this.isLoadingComentarios.set(false);
      },
      error: (error) => {
        console.error('Error al cargar comentarios:', error);
        this.isLoadingComentarios.set(false);
      }
    });
  }

  crearComentario(): void {
    const islaId = this.isla()?.id;
    const contenido = this.nuevoComentario().trim();

    if (!islaId || !contenido) return;

    this.isSubmittingComentario.set(true);

    const comentarioDto: ComentarioDtoCreate = {
      contenido: contenido,
      islaId: islaId
    };

    this.comentarioService.crearComentario(comentarioDto).subscribe({
      next: (nuevoComentario: ComentarioDtoResponse) => {
        // Agregar el nuevo comentario a la lista
        this.comentarios.update(comentarios => [nuevoComentario, ...comentarios]);
        this.nuevoComentario.set('');
        this.isSubmittingComentario.set(false);
      },
      error: (error) => {
        console.error('Error al crear comentario:', error);
        this.isSubmittingComentario.set(false);
      }
    });
  }

  toggleLikeComentario(comentarioId: number, tipoLike: TipoLike): void {
    const comentario = this.comentarios().find(c => c.id === comentarioId);
    if (!comentario) return;

    // Si ya tiene el mismo tipo de like, quitarlo
    if (comentario.userLikeType === tipoLike) {
      this.comentarioService.quitarLikeComentario(comentarioId).subscribe({
        next: () => {
          this.actualizarComentarioEnLista(comentarioId, null);
        },
        error: (error) => {
          console.error('Error al quitar like:', error);
        }
      });
    } else {
      // Agregar o cambiar el tipo de like
      this.comentarioService.agregarLikeComentario(comentarioId, tipoLike).subscribe({
        next: () => {
          this.actualizarComentarioEnLista(comentarioId, tipoLike);
        },
        error: (error) => {
          console.error('Error al agregar like:', error);
        }
      });
    }
  }

  private actualizarComentarioEnLista(comentarioId: number, nuevoTipoLike: TipoLike | null): void {
    this.comentarios.update(comentarios =>
      comentarios.map(comentario => {
        if (comentario.id === comentarioId) {
          const likesCount = comentario.likesCount;
          const dislikesCount = comentario.dislikesCount;

          // Ajustar contadores basado en el cambio
          if (comentario.userLikeType === TipoLike.ME_GUSTA && nuevoTipoLike !== TipoLike.ME_GUSTA) {
            comentario.likesCount = likesCount - 1;
          }
          if (comentario.userLikeType === TipoLike.NO_ME_GUSTA && nuevoTipoLike !== TipoLike.NO_ME_GUSTA) {
            comentario.dislikesCount = dislikesCount - 1;
          }
          if (nuevoTipoLike === TipoLike.ME_GUSTA) {
            comentario.likesCount = likesCount + 1;
          }
          if (nuevoTipoLike === TipoLike.NO_ME_GUSTA) {
            comentario.dislikesCount = dislikesCount + 1;
          }

          comentario.userLikeType = nuevoTipoLike;
        }
        return comentario;
      })
    );
  }

  // ========== MÉTODOS PARA RESPUESTAS ==========

  mostrarFormularioRespuesta(comentarioId: number): void {
    if (this.comentarioRespondiendoId() === comentarioId) {
      // Si ya está abierto para este comentario, cerrarlo
      this.comentarioRespondiendoId.set(null);
      this.nuevaRespuesta.set('');
    } else {
      // Abrir para este comentario
      this.comentarioRespondiendoId.set(comentarioId);
      this.nuevaRespuesta.set('');
    }
  }

  ocultarFormularioRespuesta(): void {
    this.comentarioRespondiendoId.set(null);
    this.nuevaRespuesta.set('');
  }

  crearRespuesta(): void {
    const comentarioPadreId = this.comentarioRespondiendoId();
    const contenido = this.nuevaRespuesta().trim();

    if (!comentarioPadreId || !contenido) return;

    this.isSubmittingRespuesta.set(true);

    const respuestaDto: ComentarioDtoCreate = {
      contenido: contenido,
      islaId: this.isla()?.id || 0,
      comentarioPadreId: comentarioPadreId
    };

    this.comentarioService.crearRespuesta(comentarioPadreId, respuestaDto).subscribe({
      next: (nuevaRespuesta: ComentarioDtoResponse) => {
        // Agregar la nueva respuesta al comentario padre
        this.comentarios.update(comentarios =>
          comentarios.map(comentario => {
            if (comentario.id === comentarioPadreId) {
              comentario.respuestas = comentario.respuestas || [];
              comentario.respuestas.unshift(nuevaRespuesta); // Agregar al inicio
            }
            return comentario;
          })
        );
        this.ocultarFormularioRespuesta();
        this.isSubmittingRespuesta.set(false);
      },
      error: (error) => {
        console.error('Error al crear respuesta:', error);
        this.isSubmittingRespuesta.set(false);
      }
    });
  }
}
