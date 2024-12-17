import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplineModelComponent } from './spline-model.component';

describe('SplineModelComponent', () => {
  let component: SplineModelComponent;
  let fixture: ComponentFixture<SplineModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SplineModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplineModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
