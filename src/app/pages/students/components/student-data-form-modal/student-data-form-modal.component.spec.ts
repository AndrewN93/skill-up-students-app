import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDataFormModalComponent } from './student-data-form-modal.component';

describe('StudentDataFormModalComponent', () => {
  let component: StudentDataFormModalComponent;
  let fixture: ComponentFixture<StudentDataFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDataFormModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDataFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
