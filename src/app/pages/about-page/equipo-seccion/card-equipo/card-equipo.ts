import {Component, input} from '@angular/core';
import type {Miembro} from '../../../../type/Miembro';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-card-equipo',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './card-equipo.html',
  styleUrl: './card-equipo.css'
})
export class CardEquipo {
  mienbro = input.required<Miembro>();
}
