import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { StudentsApiService } from '../../services/students-api.service';
import { StudentEffects } from './student.effects';
import { StudentsRootState } from '../reducers';
import { TestScheduler } from 'rxjs/testing';
import { studentActions } from '../actions/student.actions';

describe('Student Effects', () => {
  const student = {
    name: 'Test12',
    startDate: '2022-12-22T22:00:00.000Z',
    ovarageScore: 123,
    isInTop: true,
    isActive: true,
    id: '3',
  };
  const initialState = {
    data: {
      id: '',
      name: '',
      startDate: '',
      ovarageScore: 0,
      isInTop: false,
      isActive: false,
    },
    isSaving: false,
    isLoading: false,
    savingError: '',
  };
  const studentsApiServiceMock = jasmine.createSpyObj('studentsApiService', [
    'getSingleStudent',
    'putEditStudent',
    'postAddStudent',
    'deleteStudent',
  ]);
  let actions$ = new Observable<Action>();
  let store: MockStore<Pick<StudentsRootState, 'student'>>;

  let effects: StudentEffects;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudentEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: StudentsApiService, useValue: studentsApiServiceMock },
      ],
    });

    effects = TestBed.inject(StudentEffects);
    store = TestBed.inject(MockStore);
    store.setState({ student: initialState });

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  
  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadStudent$', () => {
    
    it('Should on succeded loadStudent action return loadStudentSuccess action', () => {
      const { loadStudent, loadStudentSuccess } = studentActions;

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('a', { a: loadStudent });
        const response = cold('-b|', { b: student });
        studentsApiServiceMock.getSingleStudent.and.returnValue(response);

        expectObservable(effects.loadStudent$).toBe('-b', {
          b: loadStudentSuccess({ student }),
        });
      });
    });

    
    it('Should call getSingleStudent method with id from payload', () => {
      const { loadStudent } = studentActions;
      const id = 'testId';
      actions$ = of(loadStudent({ id }));
      studentsApiServiceMock.getSingleStudent.and.returnValue(of(null));
      effects.loadStudent$.subscribe(() => {
        expect(studentsApiServiceMock.getSingleStudent).toHaveBeenCalledWith(
          id
        );
      });
    });
  });

  describe('saveStudent$', () => {
    
    it('Should on succeded saveStudent action return saveStudentSuccess action', () => {
      const { saveStudent, saveStudentSuccess } = studentActions;

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('a', { a: saveStudent });
        const response = cold('-b|', { b: student });
        studentsApiServiceMock.postAddStudent.and.returnValue(response);

        expectObservable(effects.saveStudent$).toBe('-b', {
          b: saveStudentSuccess(),
        });
      });
    });
    
    it('Should on failed saveStudent action return saveStudentFailure action', () => {
      const { saveStudent, saveStudentFailure } = studentActions;
      const error = 'Failed to save user! Please try again.';

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('a', { a: saveStudent({ studentData: student}) });
        const response = cold('#', {});
        studentsApiServiceMock.postAddStudent.and.returnValue(response);
        expectObservable(effects.saveStudent$)
          .toBe('(b|)', { b: saveStudentFailure({ error })});
      });
    });
    
    it('Should call putEditStudent method with data from payload if id property was provided', () => {
      const id = 'testId';
      actions$ = of(
        studentActions.saveStudent({ studentData: { ...student }, id })
      );
      studentsApiServiceMock.putEditStudent.and.returnValue(of(null));
      effects.saveStudent$.subscribe(() => {
        expect(studentsApiServiceMock.putEditStudent).toHaveBeenCalled();
      });
    });
    
    it('Should call postAddStudent method with data from payload if id property was NOT provided', () => {
      actions$ = of(studentActions.saveStudent({ studentData: student }));
      studentsApiServiceMock.postAddStudent.and.returnValue(of(null));
      effects.saveStudent$.subscribe(() => {
        expect(studentsApiServiceMock.postAddStudent).toHaveBeenCalled();
      });
    });
  });

  describe('deleteStudent$', () => {
    
    it('Should on succeded deleteStudent action return deleteStudentSuccess action', () => {
      const { deleteStudent, deleteStudentSuccess } = studentActions;

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('a', { a: deleteStudent });
        const response = cold('-b|', { b: student });
        studentsApiServiceMock.deleteStudent.and.returnValue(response);

        expectObservable(effects.deleteStudent$).toBe('-b', {
          b: deleteStudentSuccess(),
        });
      });
    });
    
    it('Should on failed deleteStudent action return deleteStudentFailure action', () => {
      const { deleteStudent, deleteStudentFailure } = studentActions;

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('a', { a: deleteStudent });
        const response = cold('#', { b: student });
        studentsApiServiceMock.deleteStudent.and.returnValue(response);

        expectObservable(effects.deleteStudent$).toBe('(b|)', {
          b: deleteStudentFailure({error: 'Failed to delete user! Please try again later.'}),
        });
      });
    });
    
    it('Should call getSingleStudent method with id from payload', () => {
      const id = 'testId';
      actions$ = of(
        studentActions.deleteStudent({ id })
      );
      studentsApiServiceMock.deleteStudent.and.returnValue(of(null));
      effects.deleteStudent$.subscribe(() => {
        expect(studentsApiServiceMock.deleteStudent).toHaveBeenCalledWith(id);
      });
    });
  });
});
