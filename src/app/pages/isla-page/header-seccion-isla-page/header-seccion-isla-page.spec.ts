import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSeccionIslaPage } from './header-seccion-isla-page';

describe('HeaderSeccionIslaPage', () => {
  let component: HeaderSeccionIslaPage;
  let fixture: ComponentFixture<HeaderSeccionIslaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSeccionIslaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSeccionIslaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
