import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentService } from 'src/app/student.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl(''),
    additional_subject: new FormControl(''),
    branch: new FormControl(''),
    email_id: new FormControl(''),
    phone_no: new FormControl(''),
    average_percentage: new FormControl('')
  });

  constructor(private studentService: StudentService, private location: Location, private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  onSubmit(): void {
    this.studentService.addStudent(this.profileForm.value).subscribe(() => {
      this.goBack();
      this.openSnackBar("Add operation successful", "dismiss");
    });

  }
}
