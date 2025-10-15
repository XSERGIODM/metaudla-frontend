import {Component, inject} from '@angular/core';
import {IslaService} from '../../service/isla-service';
import {HomeHero} from './home-hero/home-hero';
import {HomeSeccion} from './home-seccion/home-seccion';

@Component({
  selector: 'app-home',
  imports: [
    HomeHero,
    HomeSeccion
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home {
  lista= inject(IslaService);
}
