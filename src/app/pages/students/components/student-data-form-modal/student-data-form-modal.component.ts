import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { StudentsApiService } from '../../services/students-api.service';
import { studentActions } from '../../store/actions/student.actions';
import { selectStudent } from '../../store/reducers';
import { IStudent } from '../student.types';

interface IStudentForm {
  name: FormControl<string>;
  startDate: FormControl<string>;
  overageMark: FormControl<number>;
  isInTop: FormControl<boolean>;
  isActive: FormControl<boolean>;
}

@Component({
  selector: 'app-student-data-form-modal',
  templateUrl: './student-data-form-modal.component.html',
  styleUrls: ['./student-data-form-modal.component.scss'],
})
export class StudentDataFormModalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public isEditing = false;
  public studentDataFrom = this.fb.group<IStudentForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    startDate: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    overageMark: new FormControl(5, { nonNullable: true }),
    isInTop: new FormControl(false, { nonNullable: true }),
    isActive: new FormControl(true, { nonNullable: true }),
  });
  constructor(
    public fb: FormBuilder,
    public studentsApiService: StudentsApiService,
    @Inject(MAT_DIALOG_DATA) public data: Pick<IStudent, 'id'>,
    public dialogRef: MatDialogRef<StudentDataFormModalComponent>,
    private store: Store,
  ) {}

  ngOnInit() {
    if (this.data.id) {
      this.isEditing = true;
      this.store.dispatch(studentActions.loadStudent({id: this.data.id}));
    }
    this.store.select(selectStudent)
      .pipe(takeUntil(this.destroy$))
      .subscribe({next: student => this.studentDataFrom.patchValue(student)});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save() {
    if (this.studentDataFrom.valid) {
      this.store.dispatch(studentActions.saveStudent({
        studentData: this.studentDataFrom.getRawValue(),
        id: this.data?.id,
      }));
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
