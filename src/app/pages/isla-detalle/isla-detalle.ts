import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {IslaService} from '../../service/isla-service';
import {Isla} from '../../type/Isla';
import {Loader} from '../../shared/loader/loader';

@Component({
  selector: 'app-isla-detalle',
  imports: [CommonModule, RouterLink, Loader],
  templateUrl: './isla-detalle.html',
  styleUrl: './isla-detalle.css'
})
export default class IslaDetalle implements OnInit {

  islaService = inject(IslaService);
  endpointRoute = inject(ActivatedRoute);
  isLoading = signal(true);
  isla = signal<Isla | null>(null);
  imagenActual = signal<string>('');
  videoActual = signal<string>('');

  ngOnInit(): void {
    this.isLoading.set(true);
    this.islaService.obtenerIsla(this.endpointRoute.snapshot.params['key']).subscribe((isla: Isla) => {
      this.isla.set(isla);
      this.imagenActual.set(isla.imagenes?.[0] || '');
      this.videoActual.set(isla.videos?.[0] || '');
      this.isLoading.set(false);
    });
  }

  cambiarImagen(imagen: string): void {
    this.imagenActual.set(imagen);
  }

  cambiarVideo(video: string): void {
    this.videoActual.set(video);
  }
}
