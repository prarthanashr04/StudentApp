import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Student_data } from '../mock-students';

@Component({
  selector: 'app-record-editor',
  templateUrl: './record-editor.component.html',
  styleUrls: ['./record-editor.component.css']
})
export class RecordEditorComponent implements OnInit {

  profileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    additional_subject: new FormControl(''),
    branch: new FormControl(''),
    email_id: new FormControl(''),
    phone_no: new FormControl(''),
    average_percentage: new FormControl('')
  });

  dataSource = Student_data;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.profileForm.value);
    Student_data.push(this.profileForm.value)
    this.dataSource = Student_data;
    console.log(this.dataSource);
  }

}
