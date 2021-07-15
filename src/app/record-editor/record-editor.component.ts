import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CollegeData } from '../CollegeData';
import { Student_data } from '../mock-students';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';
import { StudentTableComponent } from '../student-table/student-table.component';


@Component({
  selector: 'app-record-editor',
  templateUrl: './record-editor.component.html',
  styleUrls: ['./record-editor.component.css']
})
export class RecordEditorComponent implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl(''),
    additional_subject: new FormControl(''),
    branch: new FormControl(''),
    email_id: new FormControl(''),
    phone_no: new FormControl(''),
    average_percentage: new FormControl('')
  });

  dataSource = Student_data;

  constructor(private studentService: StudentService, private location: Location, 
    private studentTable: StudentTableComponent
    ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
  
  onSubmit():void{
    this.studentService.addStudent(this.profileForm.value).subscribe(() =>{
      this.goBack() ; 
      this.studentTable.openSnackBar("Add operation","successful")
    });
    
  }

}
