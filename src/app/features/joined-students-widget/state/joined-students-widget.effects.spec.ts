import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { StudentsApiService } from '../../students/services/students-api.service';
import { JoinedStudentsWidgetState, WidgetConfig } from '../joined-students-widget.types';
import { studentWidgetActions } from './joined-students-widget.actions';
import { JoinedStudentsWidgetEffects } from './joined-students-widget.effects';
import { selectWidgetConfig } from './joined-students-widget.selectors';

const testWidgetConfig = new WidgetConfig();

describe('JoinedStudentsWidgetEffects', () => {
  const studentsApiServiceMock = jasmine.createSpyObj('studentsApiService', [
    'getStudents',
    'resolveParamsFromConfig'
  ]);
  let actions$ = new Observable<Action>();
  let store: MockStore<JoinedStudentsWidgetState>;
  let effects: JoinedStudentsWidgetEffects;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JoinedStudentsWidgetEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: { },
          selectors: [
            { selector: selectWidgetConfig, value: testWidgetConfig },
          ],
        }),
        { provide: StudentsApiService, useValue: studentsApiServiceMock },
      ],
    });

    effects = TestBed.inject(JoinedStudentsWidgetEffects);
    store = TestBed.inject(MockStore);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });


  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should loadData$ have call all necessary services correctly', () => {
    spyOn(store, 'select').and.callThrough();
    actions$ = of(studentWidgetActions.loadData());
    studentsApiServiceMock.getStudents.and.returnValue(of([]));

    effects.loadData$.subscribe(() => {
      expect(store.select).toHaveBeenCalledTimes(2);
      expect(studentsApiServiceMock.getStudents).toHaveBeenCalled();
      expect(studentsApiServiceMock.resolveParamsFromConfig).toHaveBeenCalled();
    });
  });
});
