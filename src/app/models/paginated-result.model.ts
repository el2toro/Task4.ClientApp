import { EmployeeModel } from "./employee.model";

export interface ResultModel{
    paginatedResult: PaginatedResultModel;
}

export class PaginatedResultModel{
    pageIndex = 0;
    pageSize = 0;
    count = 0;
    data = <EmployeeModel[]>[];
}