import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditThemeComponent} from './edit-theme.component';

describe('EditThemeComponent', () => {
  let component: EditThemeComponent;
  let fixture: ComponentFixture<EditThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditThemeComponent]
    });
    fixture = TestBed.createComponent(EditThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
