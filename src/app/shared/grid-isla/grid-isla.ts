import {Component, computed, input} from '@angular/core';
import {Isla} from '../../type/Isla';
import {RouterLink} from '@angular/router';


@Component({
    selector: 'app-grid-isla',
  imports: [
    RouterLink
  ],
    templateUrl: './grid-isla.html',
    styleUrl: './grid-isla.css'
})
export class GridIsla {
  isla= input.required<Isla>();



  puntuacion = computed(() => {
    const calificaciones = this.isla()?.puntuacioneCalificacions || [];
    if (calificaciones.length === 0) return 0;
    const suma = calificaciones.reduce((total, calificacion) => total + calificacion, 0);
    return Math.round((suma / calificaciones.length) * 10) / 10; // Redondea a 1 decimal
  });
  favoritos = computed(() => this.isla()?.favoritoIds?.length || 0);
  megustas = computed(() => this.isla()?.meGustaTipos?.length || 0);
}
