import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AppService } from './../app.service';
import swal from 'sweetalert2'
import 'rxjs/add/operator/catch';

@Injectable()
export class RefreshtokenInterceptor implements HttpInterceptor { 

 constructor(private router: Router,public nav:AppService) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer '+localStorage.getItem('prathip'))
    }); 
    return next.handle(authReq).catch((error: any) => {
		if (error instanceof HttpErrorResponse) {
			 switch ((<HttpErrorResponse>error).status) {
                        case 401:
                            swal("Oops!", "Session Timed Out Please Login", "info")
                            this.nav.hide();
                            this.router.navigate(['login']);
                        //case 0:
                          //  swal("Oops!", "Session Timed Out Please Login", "info")
                           // this.nav.hide();
                          //  this.router.navigate(['login']);
                    }
		}
		return Observable.throw(error);
	});
  }
}