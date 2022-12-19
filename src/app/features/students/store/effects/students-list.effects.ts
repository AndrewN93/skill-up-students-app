import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { StudentsApiService } from '../../services/students-api.service';
import { studentActions } from '../actions/student.actions';
import { studentListActions } from '../actions/students-list.actions';

@Injectable()
export class StudentsListEffects {
  loadStudentsList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        studentListActions.loadStudents,
        studentActions.saveStudentSuccess,
        studentActions.deleteStudentSuccess,
      ),
      switchMap(() => this.studentsApiService.getStudents()),
      map((students) => studentListActions.loadStudentsSuccess({ students }))
    );
  });

  constructor(
    private actions$: Actions,
    private studentsApiService: StudentsApiService,
  ) {}
}

