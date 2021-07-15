import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NSolicitudComponent } from './n-solicitud.component';

describe('NSolicitudComponent', () => {
  let component: NSolicitudComponent;
  let fixture: ComponentFixture<NSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
