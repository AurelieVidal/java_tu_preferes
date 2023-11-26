import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionCartesComponent} from './gestion-cartes.component';

describe('GestionCartesComponent', () => {
  let component: GestionCartesComponent;
  let fixture: ComponentFixture<GestionCartesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCartesComponent]
    });
    fixture = TestBed.createComponent(GestionCartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
