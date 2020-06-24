import { Pipe, PipeTransform } from '@angular/core';
import { EntryService } from '../services/entry.service';

@Pipe({
  name: 'entryType'
})
export class EntryTypePipe implements PipeTransform {

  transform(value: number): string {
   try {
     return EntryService.getEntryType().find(x => x.value === value).label;
   }catch(error) {
     return '';
   }
  }

}
