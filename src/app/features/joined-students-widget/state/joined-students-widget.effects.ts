import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, forkJoin, of, concatMap } from 'rxjs';
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
      concatLatestFrom((action) => this.store.select(selectWidgetConfig(action.id))),
      concatMap(([action, config]) => forkJoin([
        this.studentsApiService.getStudentsWidgetData(config),
        of(action),
      ])),
      map(([ widgetData, action ]) => {
        return studentWidgetActions.loadDataSuccess({ widgetData, id: action.id });
      })
    );
  });

  public updateConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentWidgetActions.updateConfig),
      map((action) => studentWidgetActions.loadData({ id: action.id }))
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    public dateTimeService: DateTimeService,
    public studentsApiService: StudentsApiService
  ) { }
}
