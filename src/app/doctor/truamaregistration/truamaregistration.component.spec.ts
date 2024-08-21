import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruamaregistrationComponent } from './truamaregistration.component';

describe('TruamaregistrationComponent', () => {
  let component: TruamaregistrationComponent;
  let fixture: ComponentFixture<TruamaregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruamaregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruamaregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
