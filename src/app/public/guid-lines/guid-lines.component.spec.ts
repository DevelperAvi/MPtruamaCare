import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidLinesComponent } from './guid-lines.component';

describe('GuidLinesComponent', () => {
  let component: GuidLinesComponent;
  let fixture: ComponentFixture<GuidLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidLinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
