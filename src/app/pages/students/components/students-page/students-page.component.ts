import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { studentActions } from '../../store/actions/student.actions';
import { studentListActions } from '../../store/actions/students-list.actions';
import { selectStudentsList } from '../../store/reducers';
import { StudentDataFormModalComponent } from '../student-data-form-modal/student-data-form-modal.component';
import { IStudent } from '../student.types';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss'],
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private dialogRef: MatDialogRef<StudentDataFormModalComponent> | null = null;
  
  displayedColumns: string[] = [
    'name',
    'startDate',
    'ovarageScore',
    'isInTop',
    'isActive',
    'actions',
  ];
  dataSource: IStudent[] = [];
  isLoading = false;

  constructor(
    private readonly store: Store,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.store.dispatch(studentListActions.loadStudents());
      
    this.store.select(selectStudentsList)
      .pipe(
        tap(() => this.dialogRef && this.dialogRef.close()),
        takeUntil(this.destroy$)
      )
      .subscribe(students => this.dataSource = students);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  addStudent() {
    this.openStudentDataModal();
  }

  editStudent(id: string) {
    this.openStudentDataModal(id);
  }

  deleteStudent(id: string) {
    this.store.dispatch(studentActions.deleteStudent({id}))
  }

  private openStudentDataModal(id?: string) {
    this.dialogRef = this.dialog.open(StudentDataFormModalComponent, { data: {id} });
  }
}
