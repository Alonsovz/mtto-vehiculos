import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosVehiculosComponent } from './contratos-vehiculos.component';

describe('ContratosVehiculosComponent', () => {
  let component: ContratosVehiculosComponent;
  let fixture: ComponentFixture<ContratosVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratosVehiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
