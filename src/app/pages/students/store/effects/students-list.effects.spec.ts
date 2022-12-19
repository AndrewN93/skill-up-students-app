import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { StudentsApiService } from '../../services/students-api.service';
import { TestScheduler } from 'rxjs/testing';
import { studentActions } from '../actions/student.actions';
import { studentListActions } from '../actions/students-list.actions';
import { StudentsRootState } from '..';
import { StudentsListEffects } from './students-list.effects';

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
    'getStudents',
  ]);
  let actions$ = new Observable<Action>();
  let store: MockStore<Pick<StudentsRootState, 'student'>>;

  let effects: StudentsListEffects;
  let testScheduler: TestScheduler | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudentsListEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: StudentsApiService, useValue: studentsApiServiceMock },
      ],
    });

    effects = TestBed.inject(StudentsListEffects);
    store = TestBed.inject(MockStore);
    store.setState({ student: initialState });

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadStudentsList$', () => {
    it('Should handle particular list of actions', () => {
      const actionsToHandle = [
        studentListActions.loadStudents,
        studentActions.saveStudentSuccess,
        studentActions.deleteStudentSuccess,
      ];

      actionsToHandle.forEach((action) => {
        
        testScheduler?.run(({ hot, cold, expectObservable }) => {
          actions$ = hot('a', { a: action });
          const response = cold('-b|', { b: [student] });
          studentsApiServiceMock.getStudents.and.returnValue(response);
  
          expectObservable(effects.loadStudentsList$).toBe('-b', {
            b: studentListActions.loadStudentsSuccess({ students: [student] }),
          });
        });
        testScheduler = new TestScheduler((actual, expected) => {
          expect(actual).toEqual(expected);
        });
      });

    });

    it('Should call getSingleStudent method with id from payload', () => {
      const { loadStudents } = studentListActions;
      actions$ = of(loadStudents());
      studentsApiServiceMock.getStudents.and.returnValue(of(null));
      effects.loadStudentsList$.subscribe(() => {
        expect(studentsApiServiceMock.getStudents).toHaveBeenCalled();
      });
    });
  });
});
