import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSeccionIslaPage } from './filter-seccion-isla-page';

describe('FilterSeccionIslaPage', () => {
  let component: FilterSeccionIslaPage;
  let fixture: ComponentFixture<FilterSeccionIslaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSeccionIslaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSeccionIslaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
