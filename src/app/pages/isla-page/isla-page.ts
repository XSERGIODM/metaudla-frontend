import {Component, inject} from '@angular/core';
import {HeaderSeccionIslaPage} from './header-seccion-isla-page/header-seccion-isla-page';
import {FilterSeccionIslaPage} from './filter-seccion-isla-page/filter-seccion-isla-page';
import {IslaService} from '../../service/isla-service';
import {GridIsla} from '../../shared/grid-isla/grid-isla';

@Component({
  selector: 'app-isla-page',
  imports: [
    HeaderSeccionIslaPage,
    FilterSeccionIslaPage,
    GridIsla
  ],
  templateUrl: './isla-page.html',
  styleUrl: './isla-page.css'
})
export default class IslaPage {
  lista= inject(IslaService);
}
