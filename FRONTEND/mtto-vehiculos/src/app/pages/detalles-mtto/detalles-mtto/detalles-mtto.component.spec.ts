import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMttoComponent } from './detalles-mtto.component';

describe('DetallesMttoComponent', () => {
  let component: DetallesMttoComponent;
  let fixture: ComponentFixture<DetallesMttoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesMttoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesMttoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
