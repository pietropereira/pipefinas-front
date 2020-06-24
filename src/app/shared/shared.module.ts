import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [ErrorMessagesComponent, FormFieldErrorComponent, PageHeaderComponent, BreadCrumbComponent, FooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],

  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    RouterModule,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ErrorMessagesComponent,
    FooterComponent,
    NgxPaginationModule,
  ]
})
export class SharedModule { }
