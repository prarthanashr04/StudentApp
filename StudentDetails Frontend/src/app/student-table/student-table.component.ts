import { Component, OnInit } from '@angular/core';
import { StudentDataType } from '../detail-data-types';
import { StudentService } from '../student.service';
import { MatDialog } from '@angular/material/dialog';
import { EditContentDialogComponent } from '../record-editor/edit-content-dialog/edit-content-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'additional_subject', 'branch', 'email_id', 'edit_student', 'delete_student'];
  dataSource: StudentDataType[] = []

  constructor(private studentService: StudentService, public dialog: MatDialog, private _snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(dataSource => this.dataSource = dataSource);
  }

  openDialog(student: StudentDataType): void {
    const dialogRef = this.dialog.open(EditContentDialogComponent, {
      data: {
        showStudent: student
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getStudents();
      this.openSnackBar("Update operation successful", "dismiss")
    });
  }

  deleteStudent(student: StudentDataType): void {
    this.dataSource = this.dataSource.filter(h => h !== student);
    this.studentService.deleteStudent(student.id).subscribe(() => this.openSnackBar("Delete operation successful", "dismiss"));

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  onLogout(){  
    this.authService.logout();  
  }  

}




