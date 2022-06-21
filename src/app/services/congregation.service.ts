import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CongregationService {

  constructor(private http: HttpClient) { }

  getAllCongregations(){
    return this.http.get(environment.paths.congregation.congregationRoutes, {withCredentials: true})
  }
  saveCongregation(congregation: any){
    return this.http.post(environment.paths.congregation.congregationRoutes, congregation, {observe: 'response', withCredentials: true})
  }
  updateCongregation(congregation: any){
    return this.http.patch(environment.paths.congregation.congregationRoutes, congregation, {observe: 'response', withCredentials: true})
  }
  deleteCongregation(congregation: any){
    return this.http.delete(environment.paths.congregation.congregationRoutes, {body: congregation, observe: 'response', withCredentials: true})
  }
  getOneCongregation(_id: any){
    return this.http.get(environment.paths.congregation.congregationRoutes + _id, {observe: 'response', withCredentials: true})
  }
}
