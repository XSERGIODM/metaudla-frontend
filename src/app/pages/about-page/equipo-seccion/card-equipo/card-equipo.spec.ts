import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEquipo } from './card-equipo';

describe('CardEquipo', () => {
  let component: CardEquipo;
  let fixture: ComponentFixture<CardEquipo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEquipo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEquipo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
