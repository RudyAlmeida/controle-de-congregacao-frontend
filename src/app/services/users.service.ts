import { User } from './../interfaces/interfaces';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  loginUser(user: User){
    return this.http.post(environment.paths.users.userLogin, user, {observe: 'response', withCredentials: true})
  }
  addUser(user: User){
    return this.http.post(environment.paths.users.userRoutes, user, {observe: 'response', withCredentials: true})
  }
  updateUser(user: User){
    return this.http.patch(environment.paths.users.userRoutes, user, {observe: 'response', withCredentials: true})
  }
  deleteUser(user: User){
    return this.http.delete(environment.paths.users.userRoutes, {body: user, observe: 'response', withCredentials: true})
  }
  getOneUser(_id: any){
    return this.http.get(environment.paths.users.userRoutes + _id, {observe: 'response', withCredentials: true})
  }
  getUserByCongregation(_id: any){
    return this.http.get(environment.paths.users.userByCongragation + _id, {observe: 'response', withCredentials: true})
  }
}
