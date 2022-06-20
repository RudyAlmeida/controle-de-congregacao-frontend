import {Router} from "@angular/router"
import { UsersService } from '../../services/users.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent implements OnInit {
  user: any = {
    email: '',
    password: ''
  }
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }
  login(){
    this.usersService.loginUser(this.user).subscribe((res: any) => {
      localStorage.setItem('jwt-token', res.body.token);
      this.router.navigate(['/admin/dashboard'])
    })
  }
}
