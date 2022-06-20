import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SuperuserService } from 'src/app/services/superuser.service';

@Component({
  selector: 'app-superuser-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class SuperUserLoginComponent implements OnInit {

  user: any = {
    email: '',
    password: ''
  }
  constructor(private superUser: SuperuserService, private router: Router) { }

  ngOnInit(): void {
  }
  login(){
    this.superUser.loginSuperUser(this.user).subscribe((res: any) => {
      localStorage.setItem('jwt-token-superuser', res.body.token);
      this.router.navigate(['/superuser/dashboard'])
    })
  }

}
