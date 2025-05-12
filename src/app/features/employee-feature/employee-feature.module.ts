import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFeatureRoutingModule } from './employee-feature.routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DepartmentPipe } from '../../pipes/department.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { AddEditDialogComponent } from './components/add-edit-dialog/add-edit-dialog.component';
import { PositionPipe } from '../../pipes/position.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EmployeeFeatureRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogActions, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [
    EmployeesPageComponent,
    AboutUsPageComponent,
    AddEditDialogComponent,
    DepartmentPipe,
    PositionPipe
  ]
})

export class EmployeeFeatureModule { }
