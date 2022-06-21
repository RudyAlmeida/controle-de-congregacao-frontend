import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CongregationService {

  constructor(private http: HttpClient) { }

  token = localStorage.getItem('jwt-token-superuser')



  getAllCongregations(){
    let user: any
    user.token = this.token
    return this.http.post(environment.paths.congregation.congregationRoutes, user, {observe: 'response', withCredentials: true})
  }
  saveCongregation(congregation: any){
    congregation.token = this.token
    return this.http.post(environment.paths.congregation.congregationRoutes, congregation, {observe: 'response', withCredentials: true })
  }
  updateCongregation(congregation: any){
    congregation.token = this.token
    return this.http.patch(environment.paths.congregation.congregationRoutes, congregation, {observe: 'response', withCredentials: true})
  }
  deleteCongregation(congregation: any){
    congregation.token = this.token
    return this.http.delete(environment.paths.congregation.congregationRoutes, {body: congregation, observe: 'response', withCredentials: true})
  }
  getOneCongregation(_id: any){
    return this.http.get(environment.paths.congregation.congregationRoutes + _id, {observe: 'response', withCredentials: true})
  }
}
