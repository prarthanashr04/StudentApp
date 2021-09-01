import { Injectable } from '@angular/core';
import { StudentDataType, StudentDataTypeNoID } from './detail-data-types';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  private studentUrl = "http://localhost:3000/details";

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private idToken = localStorage.getItem("id_token");
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', authorization: "Bearer " + this.idToken })

  };

  getStudents(): Observable<StudentDataType[]> {
    return this.http.get<StudentDataType[]>(this.studentUrl)
      .pipe(
        tap(_ => console.log('fetched students')),
        catchError(this.handleError<StudentDataType[]>('getStudents', []))
      );
  }

  getStudent(id: number): Observable<StudentDataType> {
    const url = `${this.studentUrl}/${id}`;
    return this.http.get<StudentDataType>(url).pipe(
      tap(_ => console.log(`fetched student id=${id}`)),
      catchError(this.handleError<StudentDataType>(`getStudent id=${id}`))
    );
  }


  deleteStudent(id: number): Observable<StudentDataType> {
    const url = `${this.studentUrl}/${id}`;
    const operation = 'delete'
    return this.http.delete<StudentDataType>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<StudentDataType>('deleteHero'))
    );
  }

  updateStudent(student: StudentDataType): Observable<any> {
    const url = `${this.studentUrl}/${student.id}`;
    console.log(url);
    return this.http.put(url, student, this.httpOptions).pipe(
      tap(_ => console.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  addStudent(student: StudentDataTypeNoID): Observable<StudentDataTypeNoID> {
    console.log(student)
    let temp = this.http.post<StudentDataTypeNoID>(this.studentUrl, student, this.httpOptions).pipe(
      catchError(this.handleError<StudentDataTypeNoID>('addStudent'))
    );
    console.log(temp);
    return temp;
  }

  constructor(
    private http: HttpClient
  ) { }
}
