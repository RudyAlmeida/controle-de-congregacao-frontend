import { User } from './../interfaces/interfaces';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
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
    return this.http.post(environment.paths.users.userRoutes + 'getone' , user, {observe: 'response', withCredentials: true})
  }
  getUserByCongregation(_id: any){
    let user = {
      _id: _id,
    token: localStorage.getItem('jwt-token')
    }
    return this.http.post(environment.paths.users.userByCongragation, user, {observe: 'response', withCredentials: true})
  }
  addRegistry(user: User | any){
    user.token = localStorage.getItem('jwt-token')
    return this.http.patch(environment.paths.users.userRoutes+'add/', user, {observe: 'response', withCredentials: true})
  }
}
