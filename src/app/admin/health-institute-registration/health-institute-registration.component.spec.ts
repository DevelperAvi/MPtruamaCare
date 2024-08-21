import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInstituteRegistrationComponent } from './health-institute-registration.component';

describe('HealthInstituteRegistrationComponent', () => {
  let component: HealthInstituteRegistrationComponent;
  let fixture: ComponentFixture<HealthInstituteRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthInstituteRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthInstituteRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
