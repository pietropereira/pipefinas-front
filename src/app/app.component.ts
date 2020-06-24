import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'personFinanceWeb';

  isLogged: boolean = false;

  constructor(private userSrv: UserService) {}

  ngOnInit() {
    this.logged();
  }

  logged() {
    this.isLogged = this.userSrv.isStaticLogged; //first
    this.userSrv.isLogged.subscribe(logged => this.isLogged = logged); //event(att)
  }

}
