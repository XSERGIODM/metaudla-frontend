import { Component } from '@angular/core';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-home-hero',
  imports: [
  ],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.css'
})
export class HomeHero {
  env = environment;
  logo= '';
}
