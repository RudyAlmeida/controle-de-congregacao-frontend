import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SuperuserGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token: any = localStorage.getItem('jwt-token-superuser')
      if(!this.jwtHelper.isTokenExpired(token)){
        let decoded = this.jwtHelper.decodeToken(token)
        if(decoded.role == "superUser"){
          return true
        }else{
          this.router.navigate(['/'])
          return false;
        }
      }else{
        this.router.navigate(['/'])
        return false;
      }
  }
}
