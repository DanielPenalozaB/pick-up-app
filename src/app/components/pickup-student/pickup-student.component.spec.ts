import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupStudentComponent } from './pickup-student.component';

describe('PickupStudentComponent', () => {
  let component: PickupStudentComponent;
  let fixture: ComponentFixture<PickupStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickupStudentComponent]
    });
    fixture = TestBed.createComponent(PickupStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
