import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../../../services/employee.service';
import { PaginationRequestModel } from '../../../../models/pagination-request.model';
import { EmployeeModel } from '../../../../models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from '../../components/add-edit-dialog/add-edit-dialog.component';
import { MessageService } from '../../../../services/message.service';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})

export class EmployeesPageComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['position', 'name', 'dateOfBirth', 'employmentDate', 'salary', 'actions'];
  dataSource = new MatTableDataSource<EmployeeModel>();
  count!: number;
  pageNumber = 1;
  pageSize = 10;
  paginationRequest = new PaginationRequestModel();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService, 
    private messageService: MessageService) { }

  ngOnInit() {
    this.getEmployees();
  }

  filterByName(): void {
    this.paginationRequest.pageNumber = 1;
    this.paginationRequest.pageSize = 10;
    this.getEmployees();
  }

  getEmployees(): void{
    this.employeeService.getEmployees(this.paginationRequest).subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource<EmployeeModel>(result.paginatedResult.data);
        this.pageNumber = result.paginatedResult.pageIndex - 1;
        this.pageSize = result.paginatedResult.pageSize;
        this.count = result.paginatedResult.count;
      }
    })
  }

  onPageChange($event: PageEvent): void {
    this.paginationRequest.pageNumber = $event.pageIndex + 1;
    this.paginationRequest.pageSize = $event.pageSize;
    this.getEmployees();
  } 

  openDialog(isCreate: boolean, employee?: EmployeeModel): void {
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      data: {employee: employee, isCreate: isCreate },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') { return };

      isCreate ? this.addEmployee(dialogRef.componentInstance.data.employee) 
                 : this.editEmployee(dialogRef.componentInstance.data.employee);
    });
  }

  onEdit(employee?: EmployeeModel): void {
    this.openDialog(false, employee)
  }

   onDelete(employeeId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {employeeId: employeeId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmployee(employeeId);
      }
    });
  }
   
  onAdd(): void {
   this.openDialog(true);
  }

  deleteEmployee(employeeId: number): void{
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        this.messageService.showSuccess('Employee deleted successfully!');
        this.dataSource.data = this.dataSource.data.filter(e => e.id !== employeeId);
      },
      error: () => this.messageService.showError('Something went wrong!')
    })
  }

  addEmployee(employee: EmployeeModel): void{
    this.employeeService.createEmployee(employee).subscribe({
      next: (employee) => {
        this.messageService.showSuccess('Employee created successfully!');
       this.getEmployees();
      },
      error: () => this.messageService.showError('Something went wrong!')
    })
  }

  editEmployee(employee: EmployeeModel): void{
    this.employeeService.updateEmployee(employee).subscribe({
      next: () => {
        this.messageService.showSuccess('Employee Updated successfully!');
        this.getEmployees();
      },
      error: () => this.messageService.showError('Something went wrong!')
    })
  }
}

 
