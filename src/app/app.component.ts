import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({	
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(private router:Router, public nav: AppService) {}

logout(){
sessionStorage.clear();
 this.nav.hide();
	this.router.navigate(['login']);
}

}
