import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!sessionStorage.getItem('prathip')) {
      this.router.navigate(['login']);
      alert("Please Login");
      return false;
    }
    return true;
  }

}