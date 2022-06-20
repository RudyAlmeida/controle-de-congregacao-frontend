import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  loginUser(user: any){
    return this.http.post(environment.paths.users.userLogin, user, {observe: 'response'}
    )
  }
}
