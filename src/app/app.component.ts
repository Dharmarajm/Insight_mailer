import { Component,OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';
declare var $:any;
@Component({	
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 public userdata:any={};
  name:any;
  data:any;
  routeDetail:any={};

constructor(private router:Router, public nav: AppService) {

 
}

ngOnInit() {
  this.router.events.subscribe((val) => {
    if(val instanceof NavigationEnd) {
      this.routeDetail=val;
      console.log(this.routeDetail.url); 
      
         // if(this.routeDetail.url == '/profile'){
         //        alert('profile');
         // }else{
         //   this.router.navigate(['/']);
         // }
    }
       
       
       
    });

//   $(document).ready(function(){
  
//     $("[data-toggle=popover]").each(function(i, obj) {

//       $(this).popover({
//         html: true,
//         content: function() {
//           var id = $(this).attr('id')
//           return $('#popover-content-logout').html();
//         }
//       });
      
//       });
// });
  
  this.data=['sarat','derer','fdfd'];
}

logout(){
localStorage.clear();
sessionStorage.clear();
 this.nav.hide();
	this.router.navigate(['login']);
}




}
