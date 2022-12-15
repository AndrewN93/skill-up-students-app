import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { StudentsApiService } from '../services/students-api.service';
import { studentListActions } from './students.actions';

@Injectable()
export class StudentsEffects {
  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentListActions.loadStudents),
      switchMap(() => this.studentsApiService.getStudents()),
      map((students) => studentListActions.loadStudentsSuccess({ students }))
    );
  });

  constructor(
    private actions$: Actions,
    private studentsApiService: StudentsApiService,
  ) {}
}

