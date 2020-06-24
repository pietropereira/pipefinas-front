import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logged-nav',
  templateUrl: './logged-nav.component.html',
  styleUrls: ['./logged-nav.component.css']
})
export class LoggedNavComponent implements OnInit {

  constructor(private userSrv: UserService) {}

  ngOnInit() {
   
  }

  logout() {
    this.userSrv.logout();
  }

}
