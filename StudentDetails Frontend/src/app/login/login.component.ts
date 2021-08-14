import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginMode:boolean =false;
  heading: string = "Please register";
  submitButton: string = "Register";

  loginForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe( h => this.loginMode = h.login);
    if(this.loginMode){
      this.heading = "Please login";
      this.submitButton= "Login"
    }
  }

  submit():void{
    console.log(this.loginForm.value);
  }

}
