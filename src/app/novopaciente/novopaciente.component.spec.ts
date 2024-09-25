import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovopacienteComponent } from './novopaciente.component';

describe('NovopacienteComponent', () => {
  let component: NovopacienteComponent;
  let fixture: ComponentFixture<NovopacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovopacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovopacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
