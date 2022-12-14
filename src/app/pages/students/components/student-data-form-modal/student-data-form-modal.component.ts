import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentsApiService } from '../../services/students-api.service';

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
export class StudentDataFormModalComponent {
  public studentDataFrom = this.fb.group<IStudentForm>({
    name: new FormControl('', { nonNullable: true }),
    startDate: new FormControl('', { nonNullable: true }),
    overageMark: new FormControl(5, { nonNullable: true }),
    isInTop: new FormControl(false, { nonNullable: true }),
    isActive: new FormControl(true, { nonNullable: true }),
  });
  constructor(
    public fb: FormBuilder,
    public studentsApiService: StudentsApiService,
    public dialogRef: MatDialogRef<StudentDataFormModalComponent>
  ) {}

  save() {
    if (this.studentDataFrom.valid) {
      this.studentsApiService
        .postAddStudent(this.studentDataFrom.getRawValue())
        .subscribe({
          next: () => this.dialogRef.close,
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
