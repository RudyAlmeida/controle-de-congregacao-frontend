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
  addUser(user: User | any){
    user.token = localStorage.getItem('jwt-token')
    return this.http.post(environment.paths.users.userRoutes, user, {observe: 'response', withCredentials: true})
  }
  updateUser(user: User | any){
    user.token = localStorage.getItem('jwt-token')
    return this.http.patch(environment.paths.users.userRoutes, user, {observe: 'response', withCredentials: true})
  }
  deleteUser(user: User | any){
    user.token = localStorage.getItem('jwt-token')
    return this.http.delete(environment.paths.users.userRoutes, {body: user, observe: 'response', withCredentials: true})
  }
  getOneUser(user: User | any){
    user.token = localStorage.getItem('jwt-token')
    return this.http.post(environment.paths.users.userRoutes , user, {observe: 'response', withCredentials: true})
  }
  getUserByCongregation(_id: any){
    _id.token = localStorage.getItem('jwt-token')
    return this.http.post(environment.paths.users.userByCongragation, _id, {observe: 'response', withCredentials: true})
  }
}
