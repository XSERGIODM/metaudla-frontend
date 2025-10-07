import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUsuarioPage } from './dashboard-usuario-page';

describe('DashboardUsuarioPage', () => {
  let component: DashboardUsuarioPage;
  let fixture: ComponentFixture<DashboardUsuarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUsuarioPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
