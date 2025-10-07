import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Isla, Etiqueta } from '../../type/Isla';

@Component({
  selector: 'app-isla-detalle',
  imports: [CommonModule],
  templateUrl: './isla-detalle.html',
  styleUrl: './isla-detalle.css'
})
export class IslaDetalle {
  @Input() isla!: Isla;

  calcularPromedioRating(): number {
    if (!this.isla.puntuacioneCalificacions || this.isla.puntuacioneCalificacions.length === 0) {
      return 0;
    }
    const suma = this.isla.puntuacioneCalificacions.reduce((acc, rating) => acc + rating, 0);
    return Math.round((suma / this.isla.puntuacioneCalificacions.length) * 10) / 10;
  }

  calcularPorcentajeRating(rating: number): number {
    if (!this.isla.puntuacioneCalificacions || this.isla.puntuacioneCalificacions.length === 0) {
      return 0;
    }
    const cantidad = this.isla.puntuacioneCalificacions.filter(r => r === rating).length;
    return Math.round((cantidad / this.isla.puntuacioneCalificacions.length) * 100);
  }

  calcularCantidadRating(rating: number): number {
    if (!this.isla.puntuacioneCalificacions || this.isla.puntuacioneCalificacions.length === 0) {
      return 0;
    }
    return this.isla.puntuacioneCalificacions.filter(r => r === rating).length;
  }

  getInitials(nombre: string): string {
    return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getRecentReviews(): any[] {
    // Simulación de reseñas recientes
    return [
      {
        usuario: 'Usuario Anónimo',
        rating: 5,
        comentario: 'Excelente experiencia educativa. Los conceptos se explican de manera clara y los ambientes virtuales son realmente inmersivos.',
        fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        usuario: 'Usuario Anónimo',
        rating: 4,
        comentario: 'Muy buena isla educativa. Me ayudó mucho con el aprendizaje de matemáticas avanzadas.',
        fecha: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    ];
  }
}
