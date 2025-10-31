import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IslaService } from '../../service/isla-service';
import { AuthService } from '../../service/auth-service';
import { CategoriaService } from '../../service/categoria-service';
import type { Isla, IslaDtoCreate } from '../../type/Isla';
import type { CategoriaType } from '../../type/CategoriaType';

@Component({
  selector: 'app-mi-islas-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mi-islas-page.html',
  styleUrl: './mi-islas-page.css'
})
export default class MiIslasPage implements OnInit {
  // Servicios
  private islaService = inject(IslaService);
  private authService = inject(AuthService);
  private categoriaService = inject(CategoriaService);

  // Estado de las islas
  misIslas: Isla[] = [];
  cargandoIslas = false;

  // Estado del modal
  mostrarModalCrear = false;
  enviandoFormulario = false;

  // Datos del formulario
  nombreIsla = '';
  descripcionIsla = '';
  imagenesIsla = '';
  videosIsla = '';
  linkDescargaIsla = '';
  etiquetasIsla = '';
  categoriasSeleccionadas: number[] = [];

  // Categorías disponibles
  categorias: CategoriaType[] = [];
  cargandoCategorias = false;

  // Mensajes
  mensajeError = '';
  mensajeExito = '';

  // Estadísticas (hardcoded por ahora, luego se pueden calcular)
  totalIslas = 5;
  islasHabilitadas = 4;
  islasDeshabilitadas = 1;
  totalVisitas = 1250;

  ngOnInit(): void {
    this.cargarMisIslas();
  }

  private cargarMisIslas(): void {
    const usuarioActual = this.authService.currentUser();
    if (!usuarioActual) {
      console.error('Usuario no autenticado');
      return;
    }

    this.cargandoIslas = true;
    this.islaService.obtenerMisIslas(usuarioActual.id).subscribe({
      next: (islas) => {
        this.misIslas = islas;
        this.actualizarEstadisticas();
        this.cargandoIslas = false;
      },
      error: (error) => {
        console.error('Error al cargar islas:', error);
        this.cargandoIslas = false;
      }
    });
  }

  private actualizarEstadisticas(): void {
    this.totalIslas = this.misIslas.length;
    this.islasHabilitadas = this.misIslas.filter(i => i.estado === 'HABILITADO').length;
    this.islasDeshabilitadas = this.misIslas.filter(i => i.estado === 'DESHABILITADO').length;
    this.totalVisitas = this.misIslas.reduce((sum, isla) => sum + isla.visitas, 0);
  }

  abrirModalCrear(): void {
    this.limpiarFormulario();
    this.cargarCategorias();
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear(): void {
    this.mostrarModalCrear = false;
    this.limpiarFormulario();
  }

  private cargarCategorias(): void {
    this.cargandoCategorias = true;
    this.categoriaService.listarCategorias(0, 100).subscribe({
      next: (response) => {
        this.categorias = response.content;
        this.cargandoCategorias = false;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.cargandoCategorias = false;
      }
    });
  }

  toggleCategoria(categoriaId: number): void {
    const index = this.categoriasSeleccionadas.indexOf(categoriaId);
    if (index > -1) {
      this.categoriasSeleccionadas.splice(index, 1);
    } else {
      this.categoriasSeleccionadas.push(categoriaId);
    }
  }

  crearIsla(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.validarFormulario()) {
      return;
    }

    const usuarioActual = this.authService.currentUser();
    if (!usuarioActual) {
      this.mensajeError = 'Usuario no autenticado';
      return;
    }

    const islaDto: IslaDtoCreate = {
      nombre: this.nombreIsla.trim(),
      descripcion: this.descripcionIsla.trim(),
      imagenes: this.imagenesIsla.split('\n').map(url => url.trim()).filter(url => url),
      videos: this.videosIsla.split('\n').map(url => url.trim()).filter(url => url),
      linkDescarga: this.linkDescargaIsla.trim(),
      autorId: usuarioActual.id,
      etiquetas: this.etiquetasIsla.split(',').map(tag => tag.trim()).filter(tag => tag),
      categoriaIds: this.categoriasSeleccionadas
    };

    this.enviandoFormulario = true;
    this.islaService.crearIsla(islaDto).subscribe({
      next: (islaCreada) => {
        this.mensajeExito = 'Isla creada exitosamente';
        this.enviandoFormulario = false;
        this.cerrarModalCrear();
        this.cargarMisIslas(); // Recargar la lista

        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          this.mensajeExito = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error al crear isla:', error);
        this.mensajeError = error.error?.message || 'Error al crear la isla. Por favor, intenta de nuevo.';
        this.enviandoFormulario = false;
      }
    });
  }

  private validarFormulario(): boolean {
    if (!this.nombreIsla.trim()) {
      this.mensajeError = 'El nombre de la isla es requerido';
      return false;
    }

    if (!this.descripcionIsla.trim()) {
      this.mensajeError = 'La descripción es requerida';
      return false;
    }

    if (this.nombreIsla.length > 100) {
      this.mensajeError = 'El nombre no puede exceder 100 caracteres';
      return false;
    }

    if (this.descripcionIsla.length > 500) {
      this.mensajeError = 'La descripción no puede exceder 500 caracteres';
      return false;
    }

    // Validar URLs de imágenes
    const imagenesUrls = this.imagenesIsla.split('\n').map(url => url.trim()).filter(url => url);
    for (const url of imagenesUrls) {
      if (!this.esUrlValida(url)) {
        this.mensajeError = 'Una o más URLs de imágenes no son válidas';
        return false;
      }
    }

    // Validar URLs de videos
    const videosUrls = this.videosIsla.split('\n').map(url => url.trim()).filter(url => url);
    for (const url of videosUrls) {
      if (!this.esUrlValida(url)) {
        this.mensajeError = 'Una o más URLs de videos no son válidas';
        return false;
      }
    }

    // Validar link de descarga
    if (this.linkDescargaIsla && !this.esUrlValida(this.linkDescargaIsla)) {
      this.mensajeError = 'El link de descarga no es una URL válida';
      return false;
    }

    return true;
  }

  private esUrlValida(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private limpiarFormulario(): void {
    this.nombreIsla = '';
    this.descripcionIsla = '';
    this.imagenesIsla = '';
    this.videosIsla = '';
    this.linkDescargaIsla = '';
    this.etiquetasIsla = '';
    this.categoriasSeleccionadas = [];
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  recargarIslas(): void {
    this.cargarMisIslas();
  }

  calcularPromedio(puntuaciones: number[] | undefined): number {
    if (!puntuaciones || puntuaciones.length === 0) {
      return 0;
    }
    const suma = puntuaciones.reduce((a, b) => a + b, 0);
    return suma / puntuaciones.length;
  }
}
