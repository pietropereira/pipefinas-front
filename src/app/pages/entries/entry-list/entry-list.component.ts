import { Component, OnInit } from '@angular/core';
import { BaseList } from 'src/app/shared/components/base-list/base-list.component';
import { EntryModel } from 'src/app/models/Entry.Model';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseList<EntryModel> {

  p: number = 1;
  colletion: EntryModel[] = [];

  constructor(private entrySrv: EntryService) {
    super(entrySrv);
   }

  async filterByExpense(element) {
    const result = await this.entrySrv.GetAll();
    let expenses;

    if(result.success) {
      const type = parseInt(element);
      if(type === 1 || type === 2) {
        expenses = result.data.filter(x => x.type === type);
      }
      else {
        expenses = result.data;
      }
      
      return this.resources = expenses;
    }
  }
}
