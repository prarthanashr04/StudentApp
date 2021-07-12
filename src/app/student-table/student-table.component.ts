import { Component, OnInit, Inject } from '@angular/core';
import { CollegeData } from '../CollegeData';
import { StudentService } from '../student.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'additional_subject', 'branch', 'email_id', 'edit_student', 'delete_student'];
  selectedStudent?: CollegeData;
  dataSource: CollegeData[] = []

  constructor(private studentService: StudentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(dataSource => this.dataSource = dataSource);
  }

  openDialog(student: CollegeData): void {
    this.dialog.open(EditContentDialog, {
      data: {
        showStudent: student
      }
    });
  }

  deleteStudent(selectedStudent: CollegeData): void {
    //this.studentService.deleteStudent(student.id)
    this.dataSource = this.dataSource.filter(student => student.id !== selectedStudent.id);
    console.log(this.dataSource);

  }
}



@Component({
  selector: 'edit-content-dialog',
  templateUrl: 'edit-content-dialog.html',
})
export class EditContentDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}