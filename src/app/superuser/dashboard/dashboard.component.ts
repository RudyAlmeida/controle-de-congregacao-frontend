import { CongregationService } from './../../services/congregation.service';
import { SuperuserService } from 'src/app/services/superuser.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superuser-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class SuperUserDashboardComponent implements OnInit {

  constructor(private superService: SuperuserService, private congregation: CongregationService) { }

  ngOnInit(): void {
    this.congregation.getAllCongregations().subscribe(res =>{
      console.log(res)
    })
  }

}
