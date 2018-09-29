import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  apiUrl:any;
  constructor() { 
this.apiUrl="http://192.168.1.79:4021/";
//this.apiUrl="http://beena-api.insightmailer.com/"
  }

  
}