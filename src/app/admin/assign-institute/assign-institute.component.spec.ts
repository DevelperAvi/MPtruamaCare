import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignInstituteComponent } from './assign-institute.component';

describe('AssignInstituteComponent', () => {
  let component: AssignInstituteComponent;
  let fixture: ComponentFixture<AssignInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignInstituteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
