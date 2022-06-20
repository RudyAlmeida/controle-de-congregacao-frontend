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
}
