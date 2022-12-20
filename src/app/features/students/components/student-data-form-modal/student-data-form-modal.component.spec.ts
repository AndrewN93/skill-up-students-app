import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { studentActions } from '../../store/actions/student.actions';
import { selectStudent } from '../../store/selectors/student.selectors';
import { StudentDataFormModalComponent } from './student-data-form-modal.component';

const testStudent = {
  name: 'andrii',
  startDate: '2022-12-18T22:00:00.000Z',
  ovarageScore: 4,
  isInTop: false,
  isActive: false,
};

const testStudentId = '1';

describe('StudentDataFormModalComponent', () => {
  let component: StudentDataFormModalComponent;
  let fixture: ComponentFixture<StudentDataFormModalComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentDataFormModalComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectStudent,
              value: testStudent,
            },
          ],
        }),
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
          useValue: {},
        },
      ],
      imports: [BrowserModule, ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(StudentDataFormModalComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  describe('Create Student Mode', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(StudentDataFormModalComponent);
      component = fixture.componentInstance;

      store = TestBed.inject(MockStore);

      store.dispatch = jasmine.createSpy();
    });

    it('should fill the form with student data from selector on init', () => {
      component.ngOnInit();
      expect(component.studentDataFrom.getRawValue()).toEqual(testStudent);
    });

    it('should isEditing flag to remain false', () => {
      component.ngOnInit();
      expect(component.isEditing).toBeFalse();
    });

    it('should NOT dispatch loadStudent on init', () => {
      component.ngOnInit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch saveStudent with form data and undefined id field', () => {
      component.ngOnInit();

      expect(component.studentDataFrom.valid).toBeTrue();

      component.save();

      expect(store.dispatch).toHaveBeenCalledWith(
        studentActions.saveStudent({ studentData: testStudent, id: undefined })
      );
    });
  });

  describe('Edit Mode', () => {
    beforeEach(() => {
      TestBed.overrideProvider(MAT_DIALOG_DATA, {
        useValue: { id: testStudentId },
      });
      fixture = TestBed.createComponent(StudentDataFormModalComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(MockStore);

      store.dispatch = jasmine.createSpy();
    });

    it('should fill the form with student data from selector on init', () => {
      component.ngOnInit();
      expect(component.studentDataFrom.getRawValue()).toEqual(testStudent);
    });

    it('should update isEditing to true', () => {
      component.ngOnInit();
      expect(component.isEditing).toBeTrue();
    });

    it('should dispatch loadStudent on init', () => {
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should dispatch saveStudent with form data AND id field', () => {
      component.ngOnInit();

      expect(component.studentDataFrom.valid).toBeTrue();

      component.save();

      expect(store.dispatch).toHaveBeenCalledWith(
        studentActions.saveStudent({ studentData: testStudent, id: testStudentId })
      );
    });
  });
});
