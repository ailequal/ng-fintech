import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'trimWords'
})
export class TrimWordsPipe implements PipeTransform {

  /**
   * Trims text to a certain length.
   *
   * @param value
   * @param limit
   * @param completeWords
   * @param ellipsis
   *
   * @link https://stackoverflow.com/questions/44669340/how-to-truncate-text-in-angular2
   */
  transform(value: string | null, limit = 20, completeWords = false, ellipsis = '...'): string {
    if (!value)
      return ''

    if (completeWords) // Updated the length accordingly to the last word status.
      limit = value.substr(0, limit).lastIndexOf(' ');

    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }

}
