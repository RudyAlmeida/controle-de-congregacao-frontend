import { SuperUser } from './../interfaces/interfaces';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuperuserService {

  constructor(private http: HttpClient) { }

  loginSuperUser(user: any){
    return this.http.post(environment.paths.superUsers.superUserLogin, user, {observe: 'response', withCredentials: true})
  }
  addSuperUser(superUser: SuperUser){
    return this.http.post(environment.paths.superUsers.superUserRoutes, superUser, {observe: 'response', withCredentials: true})
  }
}
