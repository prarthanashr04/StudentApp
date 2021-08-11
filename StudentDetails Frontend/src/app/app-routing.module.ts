import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTableComponent  } from './student-table/student-table.component';
import { AddRecordComponent } from './record-editor/add-record/add-record.component';

const routes: Routes = [
  { path: '', redirectTo: '/studentdetails', pathMatch: 'full' },{path: 'addrecord',component : AddRecordComponent}, { path: 'studentdetails', component : StudentTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
