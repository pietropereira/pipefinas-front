import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { FreeNavComponent } from './free-nav/free-nav.component';
import { LoggedNavComponent } from './logged-nav/logged-nav.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FreeNavComponent, LoggedNavComponent, HomeComponent],
  imports: [
    CommonModule,
    NavRoutingModule,
    RouterModule,
    SharedModule
  ],
  exports: [ 
    FreeNavComponent,
    LoggedNavComponent,
    HomeComponent
  ]
})
export class NavModule { }
