import {Component, input} from '@angular/core';
import {Isla} from '../../../../type/Isla';


@Component({
    selector: 'app-grid-isla',
    imports: [],
    templateUrl: './grid-isla.html',
    styleUrl: './grid-isla.css'
})
export class GridIsla {
  isla= input.required<Isla>();
}
