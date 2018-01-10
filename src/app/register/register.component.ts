import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

firstname: string;
lastname: string;
email: string;
password: string;
phone: number;

  constructor() { }

  ngOnInit() {
  }

  register(){ }

}
