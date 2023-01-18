import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesSectionComponent } from './admin-categories-section.component';

describe('AdminCategoriesSectionComponent', () => {
  let component: AdminCategoriesSectionComponent;
  let fixture: ComponentFixture<AdminCategoriesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoriesSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoriesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
