import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {

  @Input('error-messages') errorMsgs: string[] = null;

  constructor() { }

  ngOnInit() {
  }

  
}
