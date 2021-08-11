import { Component, OnInit, Inject } from '@angular/core';
import { StudentDataType } from 'src/app/detail-data-types';
import { StudentService } from 'src/app/student.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-content-dialog',
  templateUrl: './edit-content-dialog.component.html',
  styleUrls: ['./edit-content-dialog.component.css']
})
export class EditContentDialogComponent implements OnInit {

    profileForm = new FormGroup({
                id: new FormControl(''),
                name: new FormControl(''),
                additional_subject: new FormControl(''),
                branch: new FormControl(''),
                email_id: new FormControl(''),
                phone_no: new FormControl(''),
                average_percentage: new FormControl('')
            });

    constructor(
                public dialogRef: MatDialogRef<EditContentDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private studentService: StudentService) { }

  ngOnInit(): void {
            this.profileForm.setValue({
                id: this.data.showStudent.id,
                name: this.data.showStudent.name,
                additional_subject: this.data.showStudent.additional_subject,
                branch: this.data.showStudent.branch,
                email_id: this.data.showStudent.email_id,
                phone_no: this.data.showStudent.phone_no,
                average_percentage: this.data.showStudent.average_percentage
            });
        }

  save(student: StudentDataType): void {
            if (student) {
                this.studentService.updateStudent(student)
                    .subscribe(() => {
                        this.dialogRef.close();
                    });
            }
        }

}

