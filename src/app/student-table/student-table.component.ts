import { Component, OnInit, Inject } from '@angular/core';
import { CollegeData } from '../CollegeData';
import { StudentService } from '../student.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { EditContentDialog } from '../edit-content-dialog/edit-content-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'additional_subject', 'branch', 'email_id', 'edit_student', 'delete_student'];
  selectedStudent?: CollegeData;
  dataSource: CollegeData[] = []

  constructor(private studentService: StudentService, public dialog: MatDialog , private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(dataSource => this.dataSource = dataSource);
  }

  openDialog(student: CollegeData): void {
    const dialogRef= this.dialog.open(EditContentDialog, {
      data: {
        showStudent: student
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getStudents();
      this.openSnackBar("Update operation successful","dismiss")
    });
  }

  deleteStudent(student: CollegeData): void {
    this.dataSource = this.dataSource.filter(h => h !== student);
  this.studentService.deleteStudent(student.id).subscribe( () => this.openSnackBar("Delete operation successful","dismiss"));
  
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message,action);
  }

}




