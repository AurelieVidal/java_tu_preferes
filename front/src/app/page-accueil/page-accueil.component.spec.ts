import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccueilComponent } from './page-accueil.component';

describe('PageAccueilComponent', () => {
  let component: PageAccueilComponent;
  let fixture: ComponentFixture<PageAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAccueilComponent]
    });
    fixture = TestBed.createComponent(PageAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
