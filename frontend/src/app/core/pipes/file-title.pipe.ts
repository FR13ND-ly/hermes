import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileTitle'
})
export class FileTitlePipe implements PipeTransform {

  transform(value: string, limit: number = 50, ellipsis: string = '...'): string {
    if (!value) return '';
    
    if (value.length <= limit) {
      return value;
    }
    console.log('a')
    
    return value.substring(0, limit) + ellipsis;
  }

}
