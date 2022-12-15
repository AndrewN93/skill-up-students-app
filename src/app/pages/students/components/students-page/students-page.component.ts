import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { StudentsApiService } from '../../services/students-api.service';
import { studentListActions } from '../../store/students.actions';
import { selectStudents } from '../../store/students.reducers';
import { StudentDataFormModalComponent } from '../student-data-form-modal/student-data-form-modal.component';
import { IStudent } from '../student.types';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss'],
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  displayedColumns: string[] = [
    'name',
    'startDate',
    'overageMark',
    'isInTop',
    'isActive',
    'actions',
  ];
  dataSource: IStudent[] = [];
  isLoading = false;

  constructor(
    private readonly store: Store,
    private studentsApiService: StudentsApiService, 
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.store.dispatch(studentListActions.loadStudents());
    this.store.select<IStudent[]>(selectStudents)
      .pipe(takeUntil(this.destroy$))
      .subscribe(students => this.dataSource = students);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  addStudent() {
    this.openStudentDataModal();
  }

  editStudent(student: IStudent) {
    this.openStudentDataModal(student);
  }

  deleteStudent(student: IStudent) {
    this.studentsApiService.deleteStudent(student.id).subscribe({
      next: () => this.loadStudents()
    });
  }

  private openStudentDataModal(data?: IStudent) {
    const dialogRef = this.dialog.open(StudentDataFormModalComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: (wasUpdate) => {
        console.log(wasUpdate);
        if (wasUpdate) this.loadStudents();
      },
    })
  }

  private loadStudents() {
    this.isLoading = false;
    this.studentsApiService.getStudents().subscribe({
      next: (result) => {
        this.dataSource = result;
        this.isLoading = true;
      },
      error: () => (this.isLoading = false),
    });
  }
}
