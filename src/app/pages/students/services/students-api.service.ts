import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../components/student.types';

@Injectable({
  providedIn: 'root'
})
export class StudentsApiService {

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>('/api/students');
  }

  public postAddStudent(studentData: Omit<IStudent, 'id'>): Observable<unknown> {
    return this.http.post<unknown>('/api/students', studentData);
  }

  public putEditStudent(id: string, studentData: Omit<IStudent, 'id'>): Observable<unknown> {
    return this.http.put<unknown>(`/api/students/${id}`, studentData);
  }
}
