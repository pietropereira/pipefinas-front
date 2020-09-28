import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userSrv: UserService,
    private router: Router) { }

  ngOnInit() {
    this.isLogged();
  }

  isLogged() {
    if(this.userSrv.isStaticLogged) {
      return this.router.navigateByUrl('/reports');
    }
  }

}
