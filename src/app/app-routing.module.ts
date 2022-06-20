import { SuperuserGuard } from './guards/superuser.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminLoginComponent } from './admin/login/login.component';
import { SuperUserDashboardComponent } from './superuser/dashboard/dashboard.component';
import { SuperUserLoginComponent } from './superuser/login/login.component';
import { UsersGuard } from './guards/users.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [UsersGuard]},
  {path: 'admin/login', component: AdminLoginComponent},
  {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard]},
  {path: 'superuser/login', component: SuperUserLoginComponent},
  {path: 'superuser/dashboard', component: SuperUserDashboardComponent, canActivate: [SuperuserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
