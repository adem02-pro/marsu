import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class DateToAgePipe implements PipeTransform {

  transform(date: Date): any {
    let today = new Date()
    let birthDay = new Date(date)
    let age = today.getFullYear() - birthDay.getFullYear()
    var month = today.getMonth() - birthDay.getMonth()
    if(month < 0 || (month == 0 && today.getDate() < birthDay.getDate()))
      return age--
    return age;
  }

}
