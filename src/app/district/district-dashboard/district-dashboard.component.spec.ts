import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDashboardComponent } from './district-dashboard.component';

describe('DistrictDashboardComponent', () => {
  let component: DistrictDashboardComponent;
  let fixture: ComponentFixture<DistrictDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
