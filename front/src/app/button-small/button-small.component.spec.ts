import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSmallComponent } from './button-small.component';

describe('ButtonSmallComponent', () => {
  let component: ButtonSmallComponent;
  let fixture: ComponentFixture<ButtonSmallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSmallComponent]
    });
    fixture = TestBed.createComponent(ButtonSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
