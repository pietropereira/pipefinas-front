import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavRoutingModule } from './pages/nav/nav-routing.module';
import { NavModule } from './pages/nav/nav.module';
import { HttpClientModule } from '@angular/common/http';
import { EntryTypePipe } from './pipes/entry-type.pipe';


@NgModule({
  declarations: [
    AppComponent,
    EntryTypePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavRoutingModule,
    NavModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
