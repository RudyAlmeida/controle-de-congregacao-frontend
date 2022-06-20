import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token: any = localStorage.getItem('jwt-token')
      if(!this.jwtHelper.isTokenExpired(token)){
        return true
      }else{
        this.router.navigate(['/'])
        return false;
      }
  }

}
