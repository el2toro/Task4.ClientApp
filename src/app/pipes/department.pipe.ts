import { Pipe, PipeTransform } from '@angular/core';
import { DepartmentEnum } from '../enums/department.enum';

@Pipe({
  name: 'department'
})
export class DepartmentPipe implements PipeTransform {
  transform(department: any): any {
    return DepartmentEnum[department];
  }
}
