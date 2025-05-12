import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'position'
})
export class PositionPipe implements PipeTransform {

  transform(value: string): any {
    // /([a-z])([A-Z])/g matches a lowercase letter followed by an uppercase letter.
    //'$1 $2' inserts a space between them.
    return value.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}
