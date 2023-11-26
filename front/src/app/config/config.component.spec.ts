import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigComponent} from './config.component';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigComponent]
    });
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
