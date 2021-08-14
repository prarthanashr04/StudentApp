import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTableComponent  } from './student-table/student-table.component';
import { AddRecordComponent } from './record-editor/add-record/add-record.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },{path: 'addrecord',component : AddRecordComponent}, { path: 'studentdetails', component : StudentTableComponent}, { path: 'register', component : LoginComponent, data: {login:false}}, { path: 'login', component : LoginComponent, data: {login:true}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
