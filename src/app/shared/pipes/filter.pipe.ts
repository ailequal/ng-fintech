import {Pipe, PipeTransform} from '@angular/core';
import {Contact} from "../../model/contact";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Contact[], filter: string = ''): Contact[] {
    return value.filter(element => {
      const fullName = element.name.toLowerCase() + ' ' + element.surname.toLowerCase()

      return fullName.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    })
  }

}
