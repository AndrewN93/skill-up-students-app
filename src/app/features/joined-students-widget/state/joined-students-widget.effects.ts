import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs';
import { DateTimeService } from 'src/app/services/date-time.service';
import { StudentsApiService } from '../../students/services/students-api.service';
import { studentWidgetActions } from './joined-students-widget.actions';
import { selectWidgetConfig } from './joined-students-widget.selectors';

@Injectable({
  providedIn: 'root',
})
export class JoinedStudentsWidgetEffects {
  public loadData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentWidgetActions.loadData),
      concatLatestFrom(() => this.store.select(selectWidgetConfig)),
      map(([, config]) =>
        this.studentsApiService.resolveParamsFromConfig(config)
      ),
      switchMap((params) => this.studentsApiService.getStudents(params)),
      concatLatestFrom(() => this.store.select(selectWidgetConfig)),
      map(([students, config]) => {
        const studentsByRange = this.dateTimeService.splitDataByRange(
          students,
          config.timeRange,
          'startDate'
        );
        return Object.entries(studentsByRange).map(([range, values]) => [
          range,
          values.length,
        ]);
      }),
      map((widgetData) => studentWidgetActions.loadDataSuccess({ widgetData }))
    );
  });

  public updateConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentWidgetActions.updateConfig),
      map(() => studentWidgetActions.loadData())
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    public dateTimeService: DateTimeService,
    public studentsApiService: StudentsApiService
  ) {}
}
