import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddLiaisonComponent} from './add-liaison.component';

describe('AddLiaisonComponent', () => {
  let component: AddLiaisonComponent;
  let fixture: ComponentFixture<AddLiaisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLiaisonComponent]
    });
    fixture = TestBed.createComponent(AddLiaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
