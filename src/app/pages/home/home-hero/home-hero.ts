import { Component } from '@angular/core';
import {environment} from '@environments/environment';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-hero',
  imports: [
    RouterLink
  ],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.css'
})
export class HomeHero {
  env = environment;
  logo= '';
}
