import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsApiService } from '../../services/students-api.service';
import { StudentDataFormModalComponent } from '../student-data-form-modal/student-data-form-modal.component';
import { IStudent } from '../student.types';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss'],
})
export class StudentsPageComponent implements OnInit {
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
    private studentsApiService: StudentsApiService, 
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loadStudents();
  }
  
  addStudent() {
    this.openStudentDataModal();
  }

  editStudent(student: IStudent) {
    this.openStudentDataModal(student);
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
