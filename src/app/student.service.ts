import { Injectable } from '@angular/core';
import { CollegeData } from './CollegeData';
import { Student_data } from './mock-students';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  getStudents(): Observable<CollegeData[]> {
    const dataSource = of(Student_data);
    return dataSource;
  }

  deleteStudent(id: number): void {
    for (let i = 0; i < Student_data.length; ++i) {
      if (Student_data[i].id === id) {
        Student_data.splice(i, 1);
      }
    }
    console.log(Student_data);
  }
  constructor() { }
}
