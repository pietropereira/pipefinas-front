import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { EntryModel } from '../models/Entry.Model';
import { HttpService } from './http.service';
import { ISelect } from '../interfaces/ISelect';
import { flatMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseService<EntryModel> {

  constructor(public http: HttpService) { 
    super('entry', http);
  }

  static getEntryType() : Array<ISelect> {
    return [
      { value: 1, label: 'Despesa'},
      { value: 2, label: 'Receita' }
    ]
  }

  async getByMonthAndYear(month: number, year: number) {
    const result = await this.GetAll();
    if(result.success) {
      return this.filterByMonthAndYear(result.data, month, year);
    }

  }

  private filterByMonthAndYear(entries: EntryModel[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date);
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;
      
      if(monthMatches && yearMatches) { return entry; } 
    });
  }
  
}
