import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenentTESTComponent } from './componenent-test.component';

describe('ComponenentTESTComponent', () => {
  let component: ComponenentTESTComponent;
  let fixture: ComponentFixture<ComponenentTESTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenentTESTComponent]
    });
    fixture = TestBed.createComponent(ComponenentTESTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
