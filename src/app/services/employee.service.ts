import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequestModel } from '../models/pagination-request.model';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
import { ResultModel } from '../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

constructor(private httpClient: HttpClient) { }
  private baseUrl = 'https://localhost:7033/';

  getEmployees(request: PaginationRequestModel) : Observable<ResultModel>{
    let params = new HttpParams();
    
    params = params.set('name', request.name);
    params = params.set('pageNumber', request.pageNumber);
    params = params.set('pageSize', request.pageSize);
    
    return this.httpClient.get<ResultModel>(this.baseUrl + `employees`, { params });
  }

  getEmployeeById(employeeId: number) : Observable<EmployeeModel>{
    return this.httpClient.get<EmployeeModel>(this.baseUrl + `employee/${ employeeId }`);
  }

  createEmployee(employee: EmployeeModel) : Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + `employee`, { employee: employee });
  }

  updateEmployee(employee: EmployeeModel) : Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + `employee`, { employee: employee });
  }

  deleteEmployee(employeeId: number) : Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + `employee/${ employeeId }`);
  }
}
