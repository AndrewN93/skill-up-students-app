import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { StudentsApiService } from '../../services/students-api.service';

import { StudentDataFormModalComponent } from './student-data-form-modal.component';

class StudentsApiServiceMock {}
describe('StudentDataFormModalComponent', () => {
  let component: StudentDataFormModalComponent;
  let fixture: ComponentFixture<StudentDataFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentDataFormModalComponent],
      providers: [
        provideMockStore({}),
        {
          provide: StudentsApiService,
          useClass: StudentsApiServiceMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: [],
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [],
        },
      ],
      imports: [BrowserModule, ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDataFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
