import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeModel } from '../../../../models/employee.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { DepartmentEnum } from '../../../../enums/department.enum';
import { PositionEnum } from '../../../../enums/position.enum';
import { SalaryEnum } from '../../../../enums/salary.enum';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss'],
  providers: [provideNativeDateAdapter(), DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditDialogComponent implements OnInit {
  positions!: { key: number, value: string }[];
  departments!: { key: number, value: string }[];
  selectedDepartment = { key: 1, value: '' };
  form!: FormGroup;
  employee = new EmployeeModel();
  salary = 0;
  minAge = 16;

  get maxDate(): Date{
    let date = new Date();
    date.setFullYear(date.getFullYear() - this.minAge);
    return date;
  }

  get title(): string{
    return this.data.isCreate ? 'Add employee' : 'Edit employee';
  }

  constructor(public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.initPositions();
    this.initDepartments();
    this.buildForm();
  }

  initPositions(){
    this.positions = Object.keys(PositionEnum)
    .filter(key => !isNaN(Number(key))) 
    .map(key => ({
      key: Number(key),
      value: PositionEnum[Number(key)]
    }));
  }

  initDepartments(){
    this.departments = Object.keys(DepartmentEnum)
      .filter(key => !isNaN(Number(key))) 
      .map(key => ({
        key: Number(key),
        value: DepartmentEnum[Number(key)]
      }));
  }

  buildForm(){
    if(this.data.isCreate){
      this.createAddForm();
    }
    this.createEditForm();
  }

  createAddForm(): void{
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      position: [null, Validators.required],
      department: [null, Validators.required],
      dateOfBirth: ['', Validators.required],
      employmentDate: ['', Validators.required],
      salary: [null, Validators.required],
    });
    this.form.get('department')?.disable();
    this.getDepartmentAndSalary();
    return;
  }

  createEditForm(): void{
    this.form = this.formBuilder.group({
      id: [this.data.employee.id, Validators.required],
      name: [this.data.employee.name, Validators.required],
      surname: [this.data.employee.surname, Validators.required],
      position: [this.data.employee.position, Validators.required],
      department: [DepartmentEnum[this.data.employee.department], Validators.required],
      dateOfBirth: [new Date(this.data.employee.dateOfBirth), Validators.required],
      employmentDate: [new Date(this.data.employee.employmentDate), Validators.required],
      salary: [this.data.employee.salary, Validators.required],
    })

    this.form.get('department')?.disable();
    this.getDepartmentAndSalary();
  }

  save() {
     let employee: EmployeeModel = this.form.value;

     employee.department = this.selectedDepartment.key;
     employee.dateOfBirth = this.datePipe.transform(employee.dateOfBirth, 'yyyy-MM-dd') as string;
     employee.employmentDate = this.datePipe.transform(employee.employmentDate, 'yyyy-MM-dd') as string;
     this.dialogRef.componentInstance.data.employee = employee
  }
   
  cancel() {
    this.dialogRef.close('cancel');
  }

  onPositionChange(){
    this.getDepartmentAndSalary();
    this.form.get('salary')?.setValue(this.salary);
  }

  getDepartmentAndSalary(){
    switch(this.form.value.position){
      case PositionEnum.Manager:
        this.salary = SalaryEnum.Manager;
        this.selectedDepartment = this.filterDepartment(DepartmentEnum.Sales);
        break;
      case PositionEnum.Designer:
        this.salary = SalaryEnum.Designer;
        this.selectedDepartment = this.filterDepartment(DepartmentEnum.IT)
        break;
      case PositionEnum.Tester:
        this.salary = SalaryEnum.Tester;
        this.selectedDepartment = this.filterDepartment(DepartmentEnum.IT)
        break;
      case PositionEnum.Developer:
        this.salary = SalaryEnum.Developer;
        this.selectedDepartment = this.filterDepartment(DepartmentEnum.IT)
        break;
      case PositionEnum.HR:
        this.salary = SalaryEnum.HR;
          this.selectedDepartment = this.filterDepartment(DepartmentEnum.HR);
        break;
      case PositionEnum.MarketingSpecialist:
        this.salary = SalaryEnum.MarketingSpecialist;
          this.selectedDepartment = this.filterDepartment(DepartmentEnum.Marketing);
        break;
      case PositionEnum.FinanceAnalyst:
        this.salary = SalaryEnum.FinanceAnalyst;
          this.selectedDepartment = this.filterDepartment(DepartmentEnum.Finance);
        break;
    }
  }

  filterDepartment(department: number) : any{
    return this.departments.filter(d => d.key === department)[0];
  }
}
