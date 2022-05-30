import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'trimWords'
})
export class TrimWordsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
