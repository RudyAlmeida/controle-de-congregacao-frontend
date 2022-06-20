import {Router} from "@angular/router"
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  user: any = {
    email: '',
    password: ''
  }

  ngOnInit(): void {
  }

  login(){
    this.usersService.loginUser(this.user).subscribe((res: any) => {
      localStorage.setItem('jwt-token', res.body.token);
      this.router.navigate(['/dashboard'])
    })
  }

}
