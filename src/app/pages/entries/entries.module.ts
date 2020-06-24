import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IMaskModule } from "angular-imask";


@NgModule({
  declarations: [EntryFormComponent, EntryListComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    SharedModule,
    IMaskModule
  ]
})
export class EntriesModule { }
