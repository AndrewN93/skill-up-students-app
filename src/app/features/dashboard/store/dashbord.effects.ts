import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as DashbordActions from './dashbord.actions';


@Injectable()
export class DashbordEffects {

  // dashboardDashbords$ = createEffect(() => {
  //   return this.actions$.pipe( 

  //     ofType(DashbordActions.dashboardDashbords),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => DashbordActions.dashboardDashbordsSuccess({ data })),
  //         catchError(error => of(DashbordActions.dashboardDashbordsFailure({ error }))))
  //     )
  //   );
  // });


  constructor(private actions$: Actions) {}
}
