import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {IslaService} from '../../service/isla-service';
import {map, switchMap} from 'rxjs/operators';
import {toSignal} from '@angular/core/rxjs-interop';
import {Isla} from '../../type/Isla';

@Component({
  selector: 'app-isla-detalle',
  imports: [CommonModule, RouterLink],
  templateUrl: './isla-detalle.html',
  styleUrl: './isla-detalle.css'
})
export default class IslaDetalle {

  islaService = inject(IslaService);
  endpointRoute = inject(ActivatedRoute);

  islaDetalle () {
    this.islaService.obtenerIsla(this.endpointRoute.snapshot.params['islaId']);
  }

  isla = toSignal(
    inject(ActivatedRoute)
      .params
      .pipe(
        map((parametro) => parametro['islaId']),
        switchMap((id) => this.islaService.obtenerIsla(id))
      )
  );
}
