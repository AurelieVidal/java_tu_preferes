import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBigComponent } from './button-big.component';

describe('ButtonBigComponent', () => {
  let component: ButtonBigComponent;
  let fixture: ComponentFixture<ButtonBigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonBigComponent]
    });
    fixture = TestBed.createComponent(ButtonBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
