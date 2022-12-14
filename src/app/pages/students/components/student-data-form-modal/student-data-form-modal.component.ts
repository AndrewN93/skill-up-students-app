import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentsApiService } from '../../services/students-api.service';
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
export class StudentDataFormModalComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) public data: IStudent,
    public dialogRef: MatDialogRef<StudentDataFormModalComponent>
  ) {}

  ngOnInit() {
    if (this.data) {
      this.isEditing = true;
      this.studentDataFrom.patchValue(this.data);
    }
  }

  save() {
    if (!this.studentDataFrom.valid) {
      return;
    }
    const formData = this.studentDataFrom.getRawValue();
    const observable = this.isEditing
      ? this.studentsApiService.putEditStudent(this.data?.id, formData)
      : this.studentsApiService.postAddStudent(formData);

    observable.subscribe({
      next: (res) => this.dialogRef.close(res),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
