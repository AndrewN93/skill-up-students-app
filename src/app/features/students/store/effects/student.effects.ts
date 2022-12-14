import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { StudentsApiService } from '../../services/students-api.service';
import { studentActions } from '../actions/student.actions';

@Injectable()
export class StudentEffects {
  loadStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentActions.loadStudent),
      switchMap(({ id }) => this.studentsApiService.getSingleStudent(id)),
      map((student) => studentActions.loadStudentSuccess({ student }))
    );
  });

  saveStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentActions.saveStudent),
      switchMap(({ id, studentData }) => {
        if (id) {
          return this.studentsApiService.putEditStudent(id, studentData);
        }
        return this.studentsApiService.postAddStudent(studentData);
      }),
      map(() => studentActions.saveStudentSuccess()),
      catchError(() =>
        of(
          studentActions.saveStudentFailure({
            error: 'Failed to save user! Please try again.',
          })
        )
      )
    );
  });

  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentActions.deleteStudent),
      switchMap(({ id }) => this.studentsApiService.deleteStudent(id)),
      map(() => studentActions.deleteStudentSuccess()),
      catchError(() =>
        of(
          studentActions.deleteStudentFailure({
            error: 'Failed to delete user! Please try again later.',
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private studentsApiService: StudentsApiService
  ) {}
}
