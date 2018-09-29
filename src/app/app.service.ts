import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppService {
  visible: boolean;

  constructor(public http:HttpClient,public global:Global) { this.visible = false; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  //toggle() { this.visible = !this.visible; }

  //doSomethingElseUseful() { }

  user_data(){
    return this.http.get(this.global.apiUrl+'users/user_data');
}

  
}