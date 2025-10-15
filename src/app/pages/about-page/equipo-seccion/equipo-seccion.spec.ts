import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoSeccion } from './equipo-seccion';

describe('EquipoSeccion', () => {
  let component: EquipoSeccion;
  let fixture: ComponentFixture<EquipoSeccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoSeccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoSeccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
