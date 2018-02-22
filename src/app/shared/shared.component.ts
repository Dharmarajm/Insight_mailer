import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

users: any[] = [ { "firstName": "first", "lastName": "last" }, { "firstName": "firstName", "lastName": "lastName" }, { "firstName": "Mario", "lastName": "Rossi" } ] ;
  userFilter: any =  { "firstName": "", "lastName": "" };

  constructor( private router:Router) { }

  ngOnInit() {
  }

}
